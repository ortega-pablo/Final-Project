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


router.get("/", async (req, res, next) => {

  const {userId} = req.query;
 
  
  try {
    if(userId){

      const getUser = await User.findOne({
        where: {
          id: userId
        }
      })

      return res.status(200).send(getUser)

    } else {

      const getAllUsers = await User.findAll();
      return res.status(200).send(getAllUsers)
    }

  } catch(error) {
    next(error)
  }
})

module.exports = router;