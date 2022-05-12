const { Router } = require("express");
const { User, Product, Ask } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { content } = req.body;
  const { userId, productId, orderId } = req.query;
  try {
    if (productId) {

      const newAsk = await Ask.create({
        content,
      });
      console.log(userId)
      console.log(productId)
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

module.exports = router;
