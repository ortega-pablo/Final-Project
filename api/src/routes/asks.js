const { Router } = require("express");
const { User, Product, Ask, Answer } = require("../db");
const { getUser, getProduct } = require("../controllers/getAsks");
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




router.get("/", async (req, res, next) => {          

  const {userId, productId} = req.query

  try{

    if(userId && productId){
  
      const getBoth = await Ask.findAll({
        where: {
          productId,
          userId
        }
      })
      
     if(!getBoth.length){
      return res.send("User does not have any questions for this product")
      
     }
     else{
      return res.send(getBoth)  
     }

    } else if(userId) {
    //////////////////// USER STARTS HERE ///////////////////////// 

      const getOneUser = await getUser(userId)
      
      let userArray = [];
      userArray.push(getOneUser)

      const userSimplified = userArray?.map(e => {
        return {
          id: e.id,
          userName: e.userName,
          firstName: e.firstName,
          lastName: e.lastName,
          asks: e.asks?.map(v => {
            return {
              question: v.content && v.content,
              product: v.answer && v.product
            }
          })
        }
      })

    
      if(getOneUser.asks.length === 0){
        return res.send("No questions found for this user")

      } else {
        return res.status(200).send(userSimplified)
      }

      
    //////////////////// PRODUCT STARTS HERE ///////////////////////// 
    } else if(productId){
      
        const getOneProduct = await getProduct(productId)
        
        let productArray = [];
        productArray.push(getOneProduct)


        const productSimplified = productArray?.map(e => {
          return {
            id: e.id,
            name: e.name,
            asks: e.asks?.map(v => {
              return {
                question: v?.content,
                answer: v.answer && v.answer.content
              }
            }),
          }
        })

      
        if(getOneProduct.asks.length === 0){
          return res.send("No questions found for this product")

      } else {
        return res.status(200).send(productSimplified)
      }

    }
     else {
      const getAllQuestions = await Ask.findAll();

      return res.status(200).send(getAllQuestions)

    }
  } catch(error){
    next(error)
  }
})

module.exports = router;