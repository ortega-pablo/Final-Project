const { Router } = require("express");
const router = Router();
const Stripe = require("stripe");
const {KEY_STRIPE} = process.env
const axios = require ("axios")

const stripe = new Stripe(KEY_STRIPE);


router.post('/', async (req, res) => {
    const {id, amount, userId, addressId} = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD", 
            description:"",
            payment_method: id,
            confirm: true,
        })

        await axios.post(`http://localhost:3001/orders?userId=${userId}&addressId=${addressId}`, {state: 'processing'}) 

        res.send({message: "success"});
        
    } catch (error) {

        await axios.post(`http://localhost:3001/orders?userId=${userId}&addressId=${addressId}`, {state: 'cancelled'})

        res.send({message: error.raw.message}); 
    }
})

module.exports = router;
