const { Router } = require("express");
const { Product, ShoppingCart, User, ProductInventory, Image } = require("../db");
const router = Router();

router.put("/addAmount", async(req,res,next) =>{
    let {amount} = req.body
    const {userId} = req.query
    try{
        if(amount){
            await ShoppingCart.update({
                amount,
            },{
                where:{
                    userId
                },
            })
            res.send("Product ammount uploaded!")
        }
    } catch(error) {
        res.status(404).send('No se pudo agregar un amount al producto')
    }
})

router.put("/addProduct", async (req, res, next) => {

    let {quantity} = req.body

    const {shoppingCartId, userId, productId} = req.query

    try{
        if(userId && productId) {

            const findCart = await ShoppingCart.findOne({
                where: {
                    userId
                },
            })

            const findProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if(findCart && findProduct){
               await findCart.addProduct(findProduct, {through:{total: quantity}})
                res.send("Product added to cart successfully!")
            } else {
                res.send("User or product not found")
            }

            // findCart && findProduct && await findProduct.addShoppingCart(findCart) ? res.send("Product added to cart successfully!") : 
            // res.send("User or product not found")
            

        } else if(shoppingCartId && productId){

            const findCart = await ShoppingCart.findOne({
                where: {
                    id: shoppingCartId
                },
            })

            const findProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if(findCart && findProduct){

                await findProduct.addShoppingCart(shoppingCartId)
                await findCart.increment('amount', { by: 1 });


                res.send("Product added to cart successfully!")
            } else {
                res.send("User or product not found")
            }

            // findCart && findProduct && await findProduct.addShoppingCart(shoppingCartId) ? res.send("Product added to cart successfully!") : 
            // res.send("User or product not found")
            
        } else {
            return res.send("Please provide both a user and a product")
        }

    } catch(error){
        next(error)
    }
});





router.put("/removeProduct", async (req, res, next) => {

    const {shoppingCartId, userId, productId} = req.query

    try{
        if(userId && productId) {

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
            })

            const findProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if(findCart && findProduct){

     
                findCart.products.length === 0 ? res.send("No products in cart") :

                await findProduct.removeShoppingCart(findCart) 

                res.send("Product removed from cart successfully!")
            } else {
                res.send("User or product not found")
            }

            // findCart && findProduct && await findProduct.removeShoppingCart(findCart) ? res.send("Product removed from cart successfully!") : 
            // res.send("User or product not found")
            

        } else if(shoppingCartId && productId){

            const findCart = await ShoppingCart.findOne({
                where: {
                    id: shoppingCartId
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
            })

            const findProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if(findCart && findProduct){

   

                findCart.products.length === 0  ? res.send("No products in cart") :

                await findProduct.removeShoppingCart(findCart) && await findCart.decrement('amount', { by: 1 });

                res.send("Product removed from cart successfully!")
            } else {
                res.send("User or product not found")
            }
            
        } else {
            return res.send("Please provide both a user and a product")
        }

    } catch(error){
        next(error)
    }
});




router.get("/", async (req, res, next) => {

    const {userId, shoppingCartId} = req.query;
    
    try {
        if(userId){

            const findUser = await User.findOne({
                where: {
                    id: userId
                },
                
            })



            const cartOfUser = await ShoppingCart.findOne({
                where: {
                    userId: userId,
                },
                include: {
                    model: Product,
                    through: {
                        attributes: ["total"],
                    },
                    include: [
                        {
                            model: ProductInventory,
                            attributes: ["quantity"]
                        },
                        {
                            model: Image,
                        }
                    ]
                    // {
                    //     model: Specification,
                    //     attributes: ["id", "name"],
                    //     through: {
                    //         attributes: ["value"],
                    //     },
                    //   }
                }
            })

            findUser && cartOfUser ? res.status(200).send(cartOfUser) : res.send("User not found")

        } else if(shoppingCartId){

            const cartOfUser = await ShoppingCart.findOne({
                where: {
                    id: shoppingCartId
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
            })

            cartOfUser ? res.status(200).send(cartOfUser) : res.send("Cart not found")

        } else {

            const allCarts = await ShoppingCart.findAll()

            
            allCarts ? res.status(200).send(allCarts) : res.send("No shopping carts loaded")
        }

    } catch(error) {
        next(error)
    }
})




module.exports = router;