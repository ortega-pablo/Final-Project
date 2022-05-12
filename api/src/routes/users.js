const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcrypt");

// Register User

router.post("/create", async (req, res, next) => {
  const { userName, email, password, firstName, lastName, phone } = req.body;

  try {
    let Hashpassword = bcrypt.hashSync(password, 10);
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
    console.log(user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    console.log(passwordCorrect);
    console.log("aqui: ", await bcrypt.compare(password, user.password));
    res.status(200).send("nice");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
