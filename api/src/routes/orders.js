const { Router } = require("express");
const { Product, User, Review, Order, ShoppingCart, Image, Address } = require("../db");
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



router.post("/review", async (req, res, next) => {
  const { rating, review, orderId } = req.body;
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

    return res.status(200).send(newReview);

  } catch (error) {
    next(error);
  }
});





router.post('/', async (req, res, next) => {

  const { userId, addressId } = req.query;
  const { id, amount, total, state, address, email } = req.body;


  try {

    // const payment = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: "USD", 
    //   description:"",
    //   payment_method: id,
    //   confirm: true,
    // })

    // Aqui se agrega todo de la orden is payment fue exitoso

    if (true) {

      const findUser = await User.findOne({
        where: {
          id: userId
        }, include: {
          model: Address,
          where: {
            id: addressId
          }
        }
      });

      console.log(findUser)

      
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

      const oneAddress = findUser.addresses[0]

      oneAddress.addOrder(newOrder)
      newOrder.setUser(userId);
      newOrder.addProducts(findCart.products); // O un findAll.length porque la neta esta cabron


      // await findCart.setProducts([]);
      // await findCart.update({
      //   amount: 0
      // });

    //    // Adding nodemailer when the order is created 
    //   let info = await transporter.sendMail({
    //     from: '"Exmine Store" <exmine.store@hotmail.com>', // sender address
    //     to: [findUser.email, newOrder.email], // list of receivers
    //     subject: "Confirmacion de Pedido", // Subject line
    //     text: "", // plain text body
    //     html: `<!doctype html>
    // <html ⚡4email>
    //   <head>
    //     <meta charset="utf-8">
    //   </head>
    //   <body>
    //   <h1><a href=https://final-project-ten-theta.vercel.app/> Logo Exmine<a/></h1>

    //   <h1> Hola ${findUser.firstName} ! Gracias por tu pedido</h1>
    //   <h3>Numero de Pedido: ${newOrder.id}</h3>

    //   <h4> Resumen de tu compra: </h4>

    //   <p>Total: <br>
    //   ${newOrder.total}<p/>
      
    //   <p>Envío a domicilio: <br>
    //   108 Ocean Ave. in Amityville, New York -
    //   Diego Alberto Juárez Ramírez - 555-555-5555<p/>
      
    //   </body>
    // </html>` // html body
    //   });

      return res.send(newOrder)
      // return res.send("Order created successfully!")

    } else {
      return res.send("Payment error");
    }

  } catch (error) {
    next(error)
  }
})



router.get("/", async (req, res, next) => {

  const { orderId, userId } = req.query

  try {
    if (orderId) {

      const getOrder = await Order.findOne({
        where: {
          id: orderId
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            through: {
              attributes: []
            },
            include: {
              model: Image,
              attributes: ["urlFile"],
              through: {
                attributes: []
              }
            },
          },
          {
            model: Address,
            as: "order_address"
          }
        ]
      })

      return res.send(getOrder)

    } else if (userId) {

      const getUserOrders = await Order.findAll({
        where: {
          userId
        },
        include: {
          model: Product,
          attributes: ["id", "name", "price"],
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
      })

      return res.send(getUserOrders)

    } else {

      const getAllOrders = await Order.findAll({
        include: {
          model: Product,
          attributes: ["id", "name", "price"],
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
      })

      return res.send(getAllOrders)
    }

  } catch (error) {
    next(error)
  }
})

router.put("/admin", async (req, res, next) => {

  const { userId, orderId } = req.query;
  const { state } = req.body

  try {
    if (userId && orderId) {

      const getAdmin = await User.findOne({
        // where: {
        //   role: "admin",
        //   id: userId,
        // }, 
        where: {
          [Op.and]: [
            { id: userId },
            { role: 'admin' }
          ]
        }
      })


      const getOrder = await Order.findOne({
        where: {
          id: orderId
        }
      })

      if (getAdmin && getOrder) {

        await getOrder.update({
          state,
        })

        return res.send("Order status updated successfully!")

      } else {
        return res.send("User not authorized or Order not found")
      }


    } else {
      return res.send("Please provide both a User and Order ID")
    }

  } catch (error) {
    next(error)
  }
})


module.exports = router;