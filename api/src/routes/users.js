const { Router } = require("express");
const { User } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { userName, email, password, firstName, lastName, phone, role } =
    req.body;

  try {
    const newUser = await User.create({
      userName,
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
    });

    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;