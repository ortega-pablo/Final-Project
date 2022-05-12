const { Router } = require("express");
const router = Router();
const { User } = require("../db");



router.post("/", async (req, res, next) => {

    const {userName} = req.body;

    try{

      if(userName){
        const newUser = await User.create({
          userName
         
        })

        return res.status(200).send(newUser)
      }
       
    } catch(error){
        next(error);
    }

});

module.exports = router;