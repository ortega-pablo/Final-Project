const { Router } = require("express");
const { Product, ShoppingCart, User } = require("../db");
const router = Router();


router.put("/addProduct", async (req, res, next) => {

    let {amount} = req.body
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
               
                await  findProduct.addShoppingCart(findCart)
                await findCart.increment('amount', { by: 1 });

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
            })

            const findProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if(findCart && findProduct){

                await findProduct.removeShoppingCart(findCart)
                await findCart.decrement('amount', { by: 1 });


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
            })

            const findProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if(findCart && findProduct){

                await findProduct.removeShoppingCart(shoppingCartId)
                await findCart.decrement('amount', { by: 1 });


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

            console.log(findUser)

            const cartOfUser = await ShoppingCart.findOne({
                where: {
                    userId: userId,
                },
                include: {
                    model: Product,
                    through: {
                        attributes: []
                    }
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