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





router.post('/', async (req, res, next) => {

  const {userId, productId } = req.query;
  const {id, amount, total, state, address,} = req.body;

  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 5,
      exp_year: 2023,
      cvc: '314',
    },
  });

    try {
        
        // const payment = await stripe.paymentIntents.create({
        //     amount: amount,
        //     currency: "USD", 
        //     description:"",
        //     payment_method: paymentMethod,
        //     confirm: true,
        // })

        // Aqui se agrega todo de la orden is payment fue exitoso

        if(true){
          
          const findUser = await User.findOne({
            where: {
              id: userId
            }
          });

          const findCart = await ShoppingCart.findOne({
            where: {
              userId
            }, 
            include: {
              model: Product,
              through: {
                  attributes: []
              }
            }
          });


          const findProduct = await Product.findAll({
            through: {
              attributes: [ShoppingCart],
              where:{
                id: userId
              }
            }
          });


          const newOrder = await Order.create({
            total,
            state,
            address
          });

        quantity = findCart.amount;
        newOrder.setUser(userId);
        newOrder.addProducts(findProduct, {through: {quantity:quantity}}); // O un findAll.length porque la neta esta cabron
        

        await findCart.setProducts([]);
        await findCart.update({
          amount: 0
        });

        return res.send("Order created successfully!")

        } else {
          return res.send("Payment error");
        }
        
    } catch (error) {
        next(error)
    }
})



router.get("/", async (req, res, next) => {

  const {orderId, userId} = req.query

  try {
    if(orderId) {

      const getOrder = await Order.findOne({
        where: {
          id: orderId
        },
        include: {
          model: Product,
          attributes: ["id", "name", "price", "image"]
        }
      })

      return res.send(getOrder)

    } else if(userId){

      const getUserOrders = await Order.findAll({
        where: {
          userId
        },
        include: {
          model: Product,
          attributes: ["id", "name", "price", "image"]
        }
      })

      return res.send(getUserOrders)

    } else {

      const getAllOrders = await Order.findAll({
        include: {
          model: Product,
          attributes: ["id", "name", "price", "image"]
        }
      })

      return res.send(getAllOrders)
    }
    
  }catch(error){
    next(error)
  }
})


module.exports = router;