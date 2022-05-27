const { Router } = require("express");
const { Address, User } = require("../db");
const router = Router();


router.post("/:userId", async (req, res, next) => {

    const {userId} = req.params
    const {
        addressLine1,
        addressLine2,
        postalCode,
        country,
        telephone,
        mobile
    } = req.body

    const findUser = await User.findOne({
        where: {
            id: userId
        }
    })

    try{
        if(userId && findUser){
         
            const newAddress = await Address.create({
                addressLine1,
                addressLine2,
                postalCode,
                country,
                telephone,
                mobile
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
                },
                include: {
                    model: User
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