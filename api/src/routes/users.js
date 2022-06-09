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
  OrderProducts,
} = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_WORD_JWT } = process.env;
const verifyToken = require("../middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

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
  console.log(userId);
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
              model: OrderProducts,
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
      console.log(findById);

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

    try {
      if (req.role === "superAdmin") {
        const findUser = await User.findOne({
          where: {
            id: userId,
          },
        });

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
  const { token } = req.body;
  try {
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
    if (created) {
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );

      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "exmine.hardware@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      let info = await transporter.sendMail({
        from: '"Exmine Store" <exminer.hardware@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Bienvenido a Exmine  ", // Subject line
        text: "", // plain text body
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Nueva plantilla de correo electrC3B3nico 2022-05-27</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
    <style type="text/css">
    #outlook a {
    padding:0;
    }
    .ExternalClass {
    width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height:100%;
    }
    .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
    }
    .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
    }
    [data-ogsb] .es-button {
    border-width:0!important;
    padding:15px 25px 15px 25px!important;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
    </style>
    </head>
    <body style="width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#F4F4F4"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile" color="#f4f4f4"></v:fill>
    </v:background>
    <![endif]-->
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
    <tr class="gmail-fix" height="0" style="border-collapse:collapse">
    <td style="padding:0;Margin:0">
    <table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px">
    <tr style="border-collapse:collapse">
    <td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://jiunvm.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td>
    </tr>
    </table></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td valign="top" style="padding:0;Margin:0">
    <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
    <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0;width:282px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here<br></p></td>
    </tr>
    </table></td>
    </tr>
    </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
    <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0;width:278px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
    </tr>
    </table></td>
    </tr>
    </table><!--[if mso]></td></tr></table><![endif]--></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#FFA73B;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td align="center" bgcolor="#DEA03C" style="padding:0;Margin:0;background-color:#dea03c">
    <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
    <tr style="border-collapse:collapse">
    <td align="left" style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0"><img src="https://jiunvm.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;background-color:#dea03c" bgcolor="#DEA03C" align="center">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#d1c2b0;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#D1C2B0" role="presentation">
    <tr class="es-visible-simple-html-only" style="border-collapse:collapse">
    <td align="center" style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px"><h1 style="Margin:0;line-height:58px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#685c44">Bienvenido ${name}!</h1></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td bgcolor="#D1C2B0" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0">
    <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#d1c2b0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#D1C2B0" role="presentation">
    <tr class="es-visible-simple-html-only" style="border-collapse:collapse">
    <td class="es-m-txt-l" bgcolor="#D1C2B0" align="center" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#685c44;font-size:18px">Estamos encantados de que formes parte de nosotros</p></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td class="es-m-txt-l" align="center" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#685c44;font-size:18px"><br><br>Si tienes alguna pregunta, responde a este correo electrónico:<br>exmine.hardware@gmail.com<br>siempre estamos dispuestos a ayudarte.&nbsp;<br><br><br></p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#DEA03C" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#dea03c" role="presentation">
    <tr style="border-collapse:collapse">
    <td class="es-m-txt-l" align="left" style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#685c44;font-size:18px">Saludos!</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#685c44;font-size:18px">Equipo de Exmine</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
    <tr style="border-collapse:collapse">
    <td align="left" style="Margin:0;padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:540px">
    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr class="es-visible-simple-html-only" style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px"><b>EXMINE</b></p></td>
    </tr>
    <tr style="border-collapse:collapse">
    <td align="left" style="padding:0;Margin:0;padding-top:25px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px">You received this email because you just signed up for a new account.&nbsp;</p></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0">
    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
    <tr style="border-collapse:collapse">
    <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
    <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr style="border-collapse:collapse">
    <td align="center" style="padding:0;Margin:0;display:none"></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table></td>
    </tr>
    </table>
    </div>
    </body>
    </html>
        `,
      });
    }
  } catch (error) {
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

router.put("/passwordReset", async (req, res) => {
  const { adminId, userId } = req.query;
  const { newPassword } = req.body;

  try {
    if (userId & adminId) {
      const findUser = await User.findOne({
        where: {
          id: userId,
        },
      });

      const findAdmin = await User.findOne({
        where: {
          id: adminId,
          role: "superAdmin",
        },
      });

      if (findUser && findAdmin) {
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

        const oAuth2Client = new google.auth.OAuth2(
          CLIENT_ID,
          CLIENT_SECRET,
          REDIRECT_URI
        );

        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "exmine.hardware@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });

        let info = await transporter.sendMail({
          from: '"Exmine Store" <exminer.hardware@gmail.com>', // sender address
          to: [findUser.email], // list of receivers
          subject: "Cambio de contraseña", // Subject line
          text: "", // plain text body
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
          <head>
          <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
          <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
          <meta charset="UTF-8">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta content="telephone=no" name="format-detection">
          <title>Orden Completa</title><!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
          <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]--><!--[if !mso]><!-- -->
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
          <style type="text/css">
          #outlook a {
          padding:0;
          }
          .ExternalClass {
          width:100%;
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
          line-height:100%;
          }
          .es-button {
          mso-style-priority:100!important;
          text-decoration:none!important;
          }
          a[x-apple-data-detectors] {
          color:inherit!important;
          text-decoration:none!important;
          font-size:inherit!important;
          font-family:inherit!important;
          font-weight:inherit!important;
          line-height:inherit!important;
          }
          .es-desk-hidden {
          display:none;
          float:left;
          overflow:hidden;
          width:0;
          max-height:0;
          line-height:0;
          mso-hide:all;
          }
          [data-ogsb] .es-button {
          border-width:0!important;
          padding:15px 30px 15px 30px!important;
          }
          @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
          </style>
          </head>
          <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
          <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#eeeeee"></v:fill>
          </v:background>
          <![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
          <tr style="border-collapse:collapse">
          <td valign="top" style="padding:0;Margin:0">
          <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
          <tr style="border-collapse:collapse">
          <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
          <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
          <tr style="border-collapse:collapse">
          <td align="left" style="padding:0;Margin:0;width:282px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
          </tr>
          </table></td>
          </tr>
          </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
          <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
          <tr style="border-collapse:collapse">
          <td align="left" style="padding:0;Margin:0;width:278px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
          </tr>
          </table></td>
          </tr>
          </table><!--[if mso]></td></tr></table><![endif]--></td>
          </tr>
          </table></td>
          </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse"></tr>
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
          <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
          <tr style="border-collapse:collapse">
          <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
          <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
          <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
          <tr style="border-collapse:collapse">
          <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://icon-library.com/images/forgot-password-icon/forgot-password-icon-15.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
          </tr>
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, tu solicitud para cambio de contraseña ha sido aprobada!</h2><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
          </tr>
          <tr style="border-collapse:collapse">
          <td align="center" bgcolor="#dfdcd3" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#dea03c;text-align:left"><br></h2><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#000000;text-align:center">Contraseña temporal: ${newPassword} <br></h2></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
          <tr style="border-collapse:collapse">
          <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
            Ya puedes ingresar con tu nueva contraseña. Por tu seguridad, recuerda cambiarla lo antes posible.
          
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          <tr style="border-collapse:collapse">
          <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
          
          </tr>
          </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
          
          </tr>
          </table></td>
          </tr>
          </table>
          
          
          <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
          <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
          <tr style="border-collapse:collapse">
          <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
          <tr style="border-collapse:collapse">
          <td align="center" style="padding:0;Margin:0">
          <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
          <tr style="border-collapse:collapse">
          <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
          <tr style="border-collapse:collapse">
          <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table></td>
          </tr>
          </table>
          </div>
          </body>
          </html>`,
        });

        res.send(
          `Password updated successfully. User notification sent to ${findUser.email}`
        );
      } else {
        res.send("User not found ");
      }
    } else {
      return res.send(
        "User not found or not authorized to perform this action"
      );
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/passwordResetWithEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (findUser) {
      const userforToken = {
        email: findUser.dataValues.email,
      };

      const tokenUser = jwt.sign(userforToken, KEY_WORD_JWT);

      const linkUser = `https://final-project-beryl.vercel.app/login/reset/${tokenUser}`;
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );

      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "exmine.hardware@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      let info = await transporter.sendMail({
        from: '"Exmine Store" <exmine.hardware@gmail.com>', // sender address
        to: findUser.dataValues.email, // list of receivers
        subject: "Cambio de contraseña", // Subject line
        text: "", // plain text body
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <head>
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
        <link type="text/css" rel="stylesheet" id="dark-mode-general-link">
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Orden Completa</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if !mso]><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
        <style type="text/css">
        #outlook a {
        padding:0;
        }
        .ExternalClass {
        width:100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
        line-height:100%;
        }
        .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
        }
        a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
        }
        .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
        }
        [data-ogsb] .es-button {
        border-width:0!important;
        padding:15px 30px 15px 30px!important;
        }
        @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:32px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
        </style>
        </head>
        <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#eeeeee"></v:fill>
        </v:background>
        <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
        <tr style="border-collapse:collapse">
        <td valign="top" style="padding:0;Margin:0">
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]-->
        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;width:282px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
        </tr>
        </table></td>
        </tr>
        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]-->
        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;width:278px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td>
        </tr>
        </table></td>
        </tr>
        </table><!--[if mso]></td></tr></table><![endif]--></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse"></tr>
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
        <tr style="border-collapse:collapse">
        <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px;background-color:#b6893e">
        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0"><a name="https://final-project-dun.vercel.app/" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#FFFFFF;font-size:14px"></a><h1 style="Margin:0;line-height:43px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff;text-align:center">Exmine</h1><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px"><br></p></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-left:35px;padding-right:35px;padding-top:40px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="center" style="Margin:0;padding-top:25px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px"><img src="https://icon-library.com/images/forgot-password-icon/forgot-password-icon-15.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="120"></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:28px;font-style:normal;font-weight:bold;color:#333333">Hola ${findUser.firstName}, tu solicitud para cambio de contraseña ha sido aprobada!</h2><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="center" bgcolor="#dfdcd3" style="padding:0;Margin:0;padding-bottom:10px"><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#dea03c;text-align:left"><br></h2><h2 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:verdana, geneva, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#000000;text-align:center">Ingresa a este link para reestablecer tu contraseña: ${linkUser} <br></h2></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:35px;padding-right:35px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td bgcolor="#eeeeee" align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px">
          Ya puedes ingresar con tu nueva contraseña. Por tu seguridad, recuerda cambiarla lo antes posible.
        
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:35px;padding-right:35px">
        
        </tr>
        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
        
        </tr>
        </table></td>
        </tr>
        </table>
        
        
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr style="border-collapse:collapse">
        <td align="left" bgcolor="#b6893e" style="padding:0;Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;background-color:#b6893e">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Todos los derechos reservados</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">Copyright ©&nbsp;<a href="https://final-project-dun.vercel.app/about" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px">EXMINE</a>&nbsp;2022.</p></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
        <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
        <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
        <tr style="border-collapse:collapse">
        <td class="es-infoblock made_with" align="center" style="padding:0;Margin:0;line-height:120%;font-size:0;color:#CCCCCC"><a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=accessory&utm_content=trigger_newsletter3" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px"><img src="https://vitddo.stripocdn.email/content/guids/CABINET_9df86e5b6c53dd0319931e2447ed854b/images/64951510234941531.png" alt width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table></td>
        </tr>
        </table>
        </div>
        </body>
        </html>`,
      });

      res.send(`Revise su bandeja de entrada en: ${findUser.email}`);
    } else {
      res.status(401).send("El usuario no está registrado");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/ResetPassword", async (req, res) => {
  try {
    const { password, resetToken } = req.body;
    console.log(resetToken);
    if (!password && resetToken) {
      return res
        .status(400)
        .send({ message: "Por favor llena todos los campos" });
    }
    const decoded = jwt.verify(resetToken, process.env.KEY_WORD_JWT);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res
        .status(409)
        .json({ message: "ha ocurrido un error de validacion en el usuario" });
    } else {
      let Hashpassword = bcrypt.hashSync(password, 10);
      const updatePassword = await User.update(
        {
          password: Hashpassword,
        },
        {
          where: {
            email: decoded.email,
          },
        }
      );
      return res.send({
        message: "Contraseña Reseteada",
      });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
