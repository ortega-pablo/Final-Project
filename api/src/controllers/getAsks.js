const { Product, User, Ask, Answer} = require("../db");


const getUser = async function(userId){
    return await User.findOne({
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
              },
              {
                model: Product,
                attributes: ["id", "name"]
              }
          ]
          },
        ]
      })
}


  const getProduct = async function(productId){
    return await Product.findOne({
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
              },
            ]
          }
        ]
      })
  }

  module.exports = {
    getUser,
    getProduct
  }