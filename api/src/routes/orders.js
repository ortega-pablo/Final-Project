const { Router } = require("express");
const { Product, User, Review, Order, ShoppingCart } = require("../db");
const router = Router();
const Stripe = require("stripe");
const {KEY_STRIPE} = process.env
const stripe = new Stripe(KEY_STRIPE);


router.post("/review", async (req, res, next) => {
  const { rating, review, orderId  } = req.body;
  const { userId, productId } = req.query;
  try {

    
    const product = await Product.findOne({
        where: {
            id: productId,
          },
      });

      const user = await User.findOne({
        where: {
            id: userId,
          },
      })

      const newReview = await Review.create({
          rating,
          review,
          orderId,
      })

        newReview.setUser(user);
        newReview.setProduct(product);

      return res.status(200).send(newAsk);
    
  } catch (error) {
    next(error);
  }
});





router.post('/', async (req, res) => {

  const {userId, productId } = req.query;
  const {id, amount, total, state, address} = req.body;
    try {
        
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD", 
            description:"",
            payment_method: id,
            confirm: true,
        })

        // Aqui se agrega todo de la orden is paymen fue exitoso
        if(payment){
          const findUser = await User.findOne({
            where: {
              id: userId
            }
          })

          


        } else {

        }

        
        res.send({message: "success"});
        
    } catch (error) {
        console.log(error)
        res.send({message: error.raw.message});
    }
})



// router.post("/", async (req, res, next) => {

//   const {total, state, address} = req.body
//   const {userId} = req.query

//   try {

//     const getUser = await User.findOne({
//       where: {
//         id: userId
//       }, 
//     })

//     if(getUser) {
//       const newOrder = await Order.create({
//         total,
//         state,
//         address,
//       });
//     }

//     res.status(200).send(newOrder);


//   } catch(error){
//     next(error)
//   }
// })

module.exports = router;