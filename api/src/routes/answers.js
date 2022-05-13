const { Router } = require("express");
const { User, Product, Ask, Answer } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { content } = req.body;
  const { userId, askId } = req.query;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const ask = await Ask.findOne({
      where: {
        id: askId,
      },
    });

    const newAnswer = await Answer.create({
      content,
    });

    newAnswer.setUser(user);
    newAnswer.setAsk(ask);     // changed to set becauase "add" doesnt work

    res.status(200).send(newAnswer);
    
  } catch (error) {
    next(error);
  }
});





router.get("/", async (req, res) => {          

  const {userId, productId, askId} = req.query

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
          }
        ]
      })

      console.log(getUser.answer)
      let userArray = [];
      userArray.push(getUser)

      const userSimplified = userArray?.map(e => {
        return {
          id: e.id,
          userName: e.userName,
          firstName: e.firstName,
          lastName: e.lastName,
          // questions: e.asks?.map(v => v.content),
          answers: e.asks?.map(v => v.answer.content)
        }
      })

    console.log(userSimplified)
      if(getUser.asks.length === 0){
        return res.send("No answers found for this user")

      } else {
        return res.status(200).send(userSimplified)
      }

      
    //////////////////// PRODUCT STARTS HERE ///////////////////////// 
    } else if(productId){
      
      const getProduct = await Product.findOne({
        where: {
          id: productId
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
          }
        ]
      })

        let productArray = [];
        productArray.push(getProduct)

        
        const productSimplified = productArray?.map(e => {
          return {
            id: e.id,
            name: e.name,
            // questions: e.asks?.map(v => v.content),
            answers: e.asks?.map(v => v.answer.content)
          }
        })

      
        if(getProduct.asks.length === 0){
          return res.send("No answers found for this product")

      } else {
        return res.status(200).send(productSimplified)
      }

    //////////////////// ASK ID STARTS HERE ///////////////////////// 
    } else if(askId){
      
      const getAsk = await Ask.findOne({
        where: {
          id: askId
        }, 
        include:[
          {
            model: Answer,
            attributes: ["content"],
          }
        ]
      })

      let askArray = [];
      askArray.push(getAsk)

      const askSimplified = askArray?.map(e => {
        return {
          id: e.id,
          question: e.content,
          answers: e.answer.content
        }
      })

        if(!getAsk.answer){
          return res.send("No answers found for this question")

      } else {
        return res.status(200).send(askSimplified)
      }

     
    } else {
      const getAllAnswers = await Answer.findAll();

      return res.status(200).send(getAllAnswers)
    }
  } catch(error){
    res.send(error)
  }
})

module.exports = router;