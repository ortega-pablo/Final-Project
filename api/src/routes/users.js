const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const {
  User,
  Ask,
  Answer,
  ShoppingCart,
  Address,
  Product,
  Order,
} = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_WORD_JWT } = process.env;
const verifyToken = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");

// Register User

// router.post("/create", async (req, res, next) => {
//   const { userName, email, password, firstName, lastName, phone } = req.body;

//   try {
//     let Hashpassword = bcrypt.hashSync(password, 10);
//     const userFound = User.findOne({ where: { email } });
//     if (userFound) {
//       return response.status(401).json({
//         error: "email is already used",
//       });
//     }
//     const newUser = await User.create({
//       userName,
//       email,
//       password: Hashpassword,
//       firstName,
//       lastName,
//       phone,
//     });

//     res.status(200).send(newUser);
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/create", async (req, res, next) => {
  const { userName, email, password, firstName, lastName, phone, role } =
    req.body;
  try {
    let Hashpassword = bcrypt.hashSync(password, 10);
    const userFound = await User.findOne({ where: { email } });
    if (userFound) {
      return res.status(200).json({
        error: "email is already used",
      });
    }

    const newUser = await User.create({
      userName,
      email,
      password: Hashpassword,
      firstName,
      lastName,
      phone,
      role,
    });

    const addShoppingCart = await ShoppingCart.create({});

    addShoppingCart.setUser(newUser);

    res.status(200).send("done");
  } catch (error) {
    next(error);
  }
});

// Login User

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCorrect)) {
      res.status(400).json({
        error: "invalid user or password",
      });
    }
    const userforToken = {
      id: user.id,
      username: user.username,
      rol: user.rol,
    };

    const token = jwt.sign(userforToken, KEY_WORD_JWT);
    res.status(200).send({
      firstName: user.firstName,
      username: user.userName,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verifyToken", [cors(), verifyToken], async (req, res) => {
  try {
    res.json({ msg: req.role });
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/userId", [cors(), verifyToken], async (req, res) => {
  try {
    res.json({ idUser: req.id });
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/", async (req, res, next) => {
  const { firstName } = req.query;

  try {
    if (firstName) {
      const findByName = await User.findAll({
        include: [
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"],
              },
            ],
          },
          {
            model: Address,
          },
          {
            model: Order,
            include: {
              model: Product,
            },
          },
        ],
      });
      const found = await findByName?.filter((e) =>
        e.firstName.toLowerCase().includes(firstName.toLowerCase())
      );

      found.length
        ? res.status(200).json(found)
        : res.json("User not found, please try another search");
    } else {
      const getAll = await User.findAll({
        include: [
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"],
              },
            ],
          },
          {
            model: Address,
          },
        ],
      });

      return res.status(200).send(getAll);
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (userId) {
      const findById = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"],
              },
              {
                model: Product,
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: Address,
          },
          {
            model: Order,
            include: {
              model: Product,
            },
          },
          {
            model: ShoppingCart,
            attributes: ["id", "amount", "shippingAddress", "updatedAt"],
            include: {
              model: Product,
              through: {
                attributes: [],
              },
            },
          },
        ],
      });

      return res.send(findById);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/deleteUser", async (req, res, next) => {
  const { adminId, userId } = req.query;
  try {
    const findAdmin = await User.findOne({
      where: {
        id: adminId,
        role: "admin",
      },
    });
    const findSuperAdmin = await User.findOne({
      where: {
        id: adminId,
        role: "superAdmin",
      },
    });

    if (findAdmin || findSuperAdmin) {
      const findUser = await User.destroy({
        where: {
          id: userId,
        },
      });

      findUser
        ? res.status(200).send("User deleted successfully!")
        : res.send("User not found");
    } else {
      res.send("User not authorized");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteAdmin", async (req, res, next) => {
  const { superAdminId, adminId } = req.query;

  try {
    const findSuperAdmin = await User.findOne({
      where: {
        id: superAdminId,
        role: "superAdmin",
      },
    });

    if (findSuperAdmin) {
      const findUser = await User.destroy({
        where: {
          id: adminId,
          role: "admin",
        },
      });

      findUser
        ? res.status(200).send("Admin deleted successfully!")
        : res.send("Admin not found");
    } else {
      res.send("User not authorized");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/editUser", async (req, res, next) => {
  const { adminId, userId } = req.query;
  const { userName, email, firstName, lastName, phone, role } = req.body;
  try {
    const findAdmin = await User.findOne({
      where: {
        id: adminId,
        role: "admin",
      },
    });
    const findSuperAdmin = await User.findOne({
      where: {
        id: adminId,
        role: "superAdmin",
      },
    });

    if (findAdmin || findSuperAdmin) {
      const findUser = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (findUser) {
        await User.update(
          {
            userName,
            email,
            firstName,
            lastName,
            phone,
            role,
          },
          {
            where: {
              id: userId,
            },
          }
        );
        res.status(200).send("User updated successfully!");
      } else {
        res.send("User not found");
      }
    } else {
      res.send("User not authorized");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/editAdmin", async (req, res, next) => {
  const { adminId, superAdminId } = req.query;
  const { userName, email, firstName, lastName, phone, role } = req.body;
  try {
    const findSuperAdmin = await User.findOne({
      where: {
        id: superAdminId,
        role: "superAdmin",
      },
    });

    if (findSuperAdmin) {
      const findUser = await User.findOne({
        where: {
          id: adminId,
        },
      });
      if (findUser) {
        await User.update(
          {
            userName,
            email,
            firstName,
            lastName,
            phone,
            role,
          },
          {
            where: {
              id: adminId,
            },
          }
        );
        res.status(200).send("User updated successfully!");
      } else {
        res.send("User not found");
      }
    } else {
      res.send("User not authorized");
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  "/changeUserToAdmin/:userId",
  [cors(), verifyToken],
  async (req, res, next) => {
    const { userId } = req.params;
    console.log("EMPECE A EJECUTAR LA RUTA");
    try {
      if (req.role === "superAdmin") {
        const findUser = await User.findOne({
          where: {
            id: userId,
          },
        });
        console.log("EL ROL ES:", findUser);
        if (findUser && findUser.dataValues.role === "user") {
          await User.update(
            {
              role: "admin",
            },
            {
              where: {
                id: userId,
              },
            }
          );
          res.status(200).send("User updated successfully!");
        } else {
          res.send("User not found or isnot a User");
        }
      } else {
        res.status(401).send("User not authorized");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/changeAdminToUser/:userId",
  [cors(), verifyToken],
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      if (req.role === "superAdmin") {
        const findUser = await User.findOne({
          where: {
            id: userId,
          },
        });
        if (findUser && findUser.dataValues.role === "admin") {
          await User.update(
            {
              role: "user",
            },
            {
              where: {
                id: userId,
              },
            }
          );
          res.status(200).send("User updated successfully!");
        } else {
          res.send("Admin not found or isnot a Admin");
        }
      } else {
        res.status(401).send("User not authorized");
      }
    } catch (error) {
      next(error);
    }
  }
);

/* RESET PASSWORD USER WITHOUT THE OLD PASSWORD */
router.put("/resetPasswordWithoutOld/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    const findUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (findUser) {
      let Hashpassword = bcrypt.hashSync(newPassword, 10);

      await User.update(
        {
          password: Hashpassword,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).send("password updated successfully!");
    } else {
      res.send("user not found");
    }
  } catch (error) {
    next(error);
  }
});
/* RESET PASSWORD USER WITH THE OLD PASSWORD */
router.put("/resetPasswordWithOld", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const { oldPassword, newPassword } = req.body;
    const findUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (findUser) {
      const passwordCorrect =
        findUser === null
          ? false
          : await bcrypt.compare(oldPassword, findUser.dataValues.password);
      if (!passwordCorrect) {
        return res.status(400).json({
          error: "invalid user or password",
        });
      }
      let Hashpassword = bcrypt.hashSync(newPassword, 10);
      await User.update(
        {
          password: Hashpassword,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).send("password updated successfully!");
    } else {
      res.send("user not found");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/updateDatesUser/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { currentPassword, userName, firstName, lastName, phone } = req.body;
    const findUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (findUser && !findUser.loginWithGoogle) {
      const passwordCorrect =
        findUser === null
          ? false
          : await bcrypt.compare(currentPassword, findUser.dataValues.password);
      if (!passwordCorrect) {
        return res.status(400).json({
          error: "invalid user or password",
        });
      }
      await User.update(
        {
          userName,
          firstName,
          lastName,
          phone,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).send("user updated successfully!");
    } else if (findUser && findUser.loginWithGoogle) {
      await User.update(
        {
          userName,
          firstName,
          lastName,
          phone,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).send("user updated successfully!");
    } else {
      res.send("user not found");
    }
  } catch (error) {
    next(error);
  }
});

/*VALID USER WITH GOOGLE */

const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

router.post("/google-login", async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log("este es el token de back", token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID_GOOGLE,
    });
    const { name, email, given_name, family_name } = ticket.getPayload();
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        userName: name,
        firstName: given_name,
        lastName: family_name,
        loginWithGoogle: true,
      },
    });
    const userforToken = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      rol: user.dataValues.rol,
    };

    const token2 = jwt.sign(userforToken, KEY_WORD_JWT);
    res.status(200).send({
      firstName: user.dataValues.firstName,
      username: user.dataValues.username,
      token: token2,
    });

    const addShoppingCart = await ShoppingCart.create({});

    addShoppingCart.setUser(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/autoDeleteUser", async (req, res, next) => {
  const { userId } = req.query;
  try {
    const findUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (findUser) {
      const findUser = await User.destroy({
        where: {
          id: userId,
        },
      });

      findUser
        ? res.status(200).send("User deleted successfully!")
        : res.send("User not found");
    } else {
      res.send("User not authorized");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
