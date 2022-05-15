const { Router } = require("express");
const { User, Ask, Answer } = require("../db");
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

  const {firstName} = req.query

  try{
    if(firstName) {

      const findByName = await User.findAll()
      const found = await findByName?.filter(e => e.firstName.toLowerCase().includes(firstName.toLowerCase()));

<<<<<<< HEAD
      found.length ? res.status(200).json(found) : res.json("User not found, please try another search");

    } else {
      const getAll = await User.findAll()

      return res.status(200).send(getAll)
=======
      
      found.length ? res.status(200).json(found) : res.json("User not found, please try another search");

    } else {
      const findByName = await User.findAll()
      return res.status(200).send(findByName)
>>>>>>> b70d9665c111120983c09c06b31d63665ffaa6a3
    }
  } catch(error){
    res.send(error)
  }
  
})

router.get("/:userId", async (req, res) => {

  const {userId} = req.params

  try {
    if(userId) {
      const findById = await User.findOne({
        where: {
          id: userId
        }
      })
<<<<<<< HEAD

      let temp = []
      temp.push(findById)
    
      return res.send(temp)
=======
  
      return res.send(findById)
>>>>>>> b70d9665c111120983c09c06b31d63665ffaa6a3
  
    } else{
      return res.status(404).send("User not found")
    }
  } catch(error){
    res.send(error)
  }
})

module.exports = router;