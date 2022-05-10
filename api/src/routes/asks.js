const { Router } = require("express");
const { User, Product, Ask } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { content } = req.body;
  const { UserId, productId ,orderId } = req.query;
try {
    if(productId){
        const user = await User.findAll({
            where: {
              id: UserId,
            },
          });
          const product = await Product.findAll({
            where: {
              id: productId,
            },
          });
          const newAsk = await Ask.create({
            content,
          });
      
          newAsk.addUser(user);
          newAsk.addProduct(product);
      
          return res.status(200).send(newAsk);

    } 
    if(orderId){
        const user = await User.findAll({
            where: {
              id: UserId,
            },
          });
          const order = await Order.findAll({
            where: {
              id: orderId,
            },
          });
          const newAsk = await Ask.create({
            content,
          });
      
          newAsk.addUser(user);
          newAsk.addOrder(order);
      
          return res.status(200).send(newAsk);

    } 
} catch (error) {
    next(error);
}
  
});

module.exports = router;