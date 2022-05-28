const { Router } = require("express");
const { Product, User, Review, Order, ShoppingCart, Image } = require("../db");
const router = Router();
const Stripe = require("stripe");
const { KEY_STRIPE } = process.env
const stripe = new Stripe(KEY_STRIPE);
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");



let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "exmine.store@hotmail.com", // generated ethereal user
      pass: "exmine123", // generated ethereal password
    },
  });


router.post('/', async (req, res) => {
    try {
        const { userId, productId } = req.query;
  const { id, amount, total, state, address, email } = req.body;
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD", 
            description:"",
            payment_method: id,
            confirm: true,
        })
        
       
        
    if (payment.status === "succeeded") {

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
            },
            include: {
              model: Image,
              attributes: ["urlFile"],
              through: {
                attributes: []
              }
            }
          }
        });
  
  
        const newOrder = await Order.create({
          total,
          state,
          address,
          email,
          quantity: findCart.amount
        });
  
       
        newOrder.setUser(userId);
        newOrder.addProducts(findCart.products); // O un findAll.length porque la neta esta cabron
  
  
        await findCart.setProducts([]);
        await findCart.update({
          amount: 0
        });
  
        / Adding nodemailer when the order is created ////////
        let info = await transporter.sendMail({
          from: '"Exmine Store" <exmine.store@hotmail.com>', // sender address
          to: [findUser.email, newOrder.email], // list of receivers
          subject: "Confirmacion de Pedido", // Subject line
          text: "", // plain text body
          html: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
        <h1><a href=https://final-project-ten-theta.vercel.app/> Logo Exmine<a/></h1>
  
        <h1> Hola ${findUser.firstName} ! Gracias por tu pedido</h1>
        <h3>Numero de Pedido: ${newOrder.id}</h3>
  
        <h4> Resumen de tu compra: </h4>
  
        <p>Total: <br>
        ${newOrder.total}<p/>
        
        <p>Envío a domicilio: <br>
        108 Ocean Ave. in Amityville, New York -
        Diego Alberto Juárez Ramírez - 555-555-5555<p/>
        
        </body>
      </html>` // html body
        });
  
        // return res.send(findCart)
        return res.send("Order created successfully!")
  
      } else {
        return res.send("Payment error");
      }
        
    } catch (error) {
        console.log(error)
        res.send({message: error.raw.message});
    }
})

module.exports = router;
