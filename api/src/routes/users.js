const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User, Ask, Answer, ShoppingCart, Address, Product } = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_WORD_JWT } = process.env;
const verifyToken = require("../middleware/auth");
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
  const {
    userName,
    email,
    password,
    firstName,
    lastName,
    phone,
    role,
    amount,
    shippingAddress,
  } = req.body;
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
      amount,
      shippingAddress,
    });

    const addShoppingCart = await ShoppingCart.create({
      amount,
      shippingAddress,
    });

    addShoppingCart.setUser(newUser);

    res.status(200).send("done");
  } catch (error) {
    next(error);
  }
});

// Login User

router.post("/login", async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName } });
    //console.log(user);
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
  //console.log(req);
  try {
    res.json({ msg: req.role });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en el servidor");
  }
});

router.get("/userId", [cors(), verifyToken], async (req, res) => {
  //console.log(req);
  try {
    res.json({ idUser: req.id });
  } catch (error) {
    console.error(error.message);
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

router.delete("/delete/:userId", async (req, res, next) => {
  // Esto para el admin de la pagina

  const { adminId, userId } = req.query;

  try {
    const findAdmin = await User.findOne({
      where: {
        id: adminId,
        role: "admin",
      },
    });
    //console.log(findUser.dataValues);
    //res.send(findUser);
    if (findUser) {
      await findUser.destroy({
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

router.put(
  "/changeUserToAdmin/:userId",
  [cors(), verifyToken],
  async (req, res, next) => {
    const { userId } = req.params;
    if (req.role === "superUser") {
      const findUser = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (findUser) {
        console.log(findUser);
        /* await User.update({
          role: "admin"
        })
        res.status(200).send("User updated successfully!") */
      } else {
        res.send("User not found");
      }
    } else {
      res.status(401).send("User not authorized");
    }
  }
);

module.exports = router;
