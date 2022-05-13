const { Router } = require("express");
const { User, Product, Ask, Answer } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { content } = req.body;
  const { userId, productId, orderId, } = req.query;
  try {
    if (productId) {

      const newAsk = await Ask.create({
        content,
      });

        newAsk.setUser(userId);
        newAsk.setProduct(productId);

      return res.status(200).send(newAsk);
    }
    if (orderId) {

      const newAsk = await Ask.create({
        content,
      });

        newAsk.setUser(userId);
        newAsk.setOrder(orderId)

      return res.status(200).send(newAsk);
    }
  } catch (error) {
    next(error);
  }
});





router.get("/", async (req, res) => {          

  const {userId, productId} = req.query

  try{
    if(userId) {
    //////////////////// USER STARTS HERE ///////////////////////// 
      const getUser = await User.findOne({
        where: {
          id: userId
        },
        include:[
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"]
              }
          ]
          },
        ]
      })

      let userArray = [];
      userArray.push(getUser)

      const userSimplified = userArray?.map(e => {
        return {
          id: e.id,
          userName: e.userName,
          firstName: e.firstName,
          lastName: e.lastName,
          questions: e.asks?.map(v => v.content)
        }
      })

    
      if(getUser.asks.length === 0){
        return res.send("No questions found for this user")

      } else {
        return res.status(200).send(userSimplified)
      }

      
    //////////////////// PRODUCT STARTS HERE ///////////////////////// 
    } else if(productId){
      
      const getProduct = await Product.findOne({
        where: {
          id: productId
        }, 
        include: [{
          model: Ask,
          attributes: ["content"],
        }]
      })

        let productArray = [];
        productArray.push(getProduct)
        
        const productSimplified = productArray?.map(e => {
          return {
            id: e.id,
            name: e.name,
            questions: e.asks?.map(v => v.content)
          }
        })

      
        if(getProduct.asks.length === 0){
          return res.send("No questions found for this product")

      } else {
        return res.status(200).send(productSimplified)
      }
    
    } else {
      return res.send("Not found")
    }
  } catch(error){
    res.send(error)
  }
})

module.exports = router;