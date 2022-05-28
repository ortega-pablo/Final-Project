const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const {KEY_STRIPE} = process.env

const stripe = new Stripe(KEY_STRIPE);


router.post('/', async (req, res) => {
    try {
        const {id, amount} = req.body;
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD", 
            description:"",
            payment_method: id,
            confirm: true,
        })
        
        console.log(payment)
        res.send({message: "success"});
        
    } catch (error) {
        console.log(error)
        res.send({message: error.raw.message});
    }
})

module.exports = router;
