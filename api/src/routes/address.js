const { Router } = require("express");
const { Address, User } = require("../db");
const router = Router();


router.post("/:userId", async (req, res, next) => {

    const {userId} = req.params
    const {
        FirstName,
        LastName,
        Country,
        Address1,
        City,
        EmailAddress,
        PostCode,
        Mobile
    } = req.body

    const findUser = await User.findOne({
        where: {
            id: userId
        }
    })

    try{
        if(userId && findUser){
         
            const newAddress = await Address.create({
                FirstName,
                LastName,
                Country,
                Address1,
                City,
                EmailAddress,
                PostCode,
                Mobile
            })

            findUser.addAddress(newAddress)
            res.send(newAddress)

        } else {
            res.send("Please provide a valid ID")
        }

    }catch(error){
        next(error)
    }
})



router.get("/:userId", async (req, res, next) => {

    const {userId} = req.params

    try {

        if(userId){
            const getAddress = await Address.findAll({
                where: {
                    userId
                }
            })

            console.log(getAddress)

            getAddress ? res.send(getAddress) :
            res.send("User not found")
        } else {
            
            const getAll = await Address.findAll({
                // include: {
                //     model: User
                // }
            })

            return res.send(getAll)
        }


    }catch(error){
        next(error)
    }
})



module.exports = router;