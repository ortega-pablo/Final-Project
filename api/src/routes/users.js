const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_WORD_JWT } = process.env;
// Register User

router.post("/create", async (req, res, next) => {
  const { userName, email, password, firstName, lastName, phone } = req.body;

  try {
    let Hashpassword = bcrypt.hashSync(password, 10);
    const userFound = User.findOne({ where: { email } });
    const newUser = await User.create({
      userName,
      email,
      password: Hashpassword,
      firstName,
      lastName,
      phone,
    });

    res.status(200).send(newUser);
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
      response.status(401).json({
        error: "invalid user or password",
      });
    }
    const userforToken = {
      id: user.id,
      username: user.username,
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

module.exports = router;
