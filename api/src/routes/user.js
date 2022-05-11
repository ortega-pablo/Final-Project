const { Router } = require("express");
const router = Router();
const { User } = require("../db");



router.post("/", async (req, res, next) => {

    const {name} = req.body;

    try{

      if(name){
        const newUser = await User.create({
            name
        })
        return res.status(200).send(newUser)
      }
       
    } catch(error){
        next(error);
    }

});

module.exports = router;