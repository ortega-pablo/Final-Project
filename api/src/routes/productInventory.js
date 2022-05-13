const { Router } = require("express");
const router = Router();

const { Product, ProductInventory } = require("../db");

router.post("/", async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.query;

  try {
    const addQuantity = await ProductInventory.create({
      quantity,
    });

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    addQuantity.setProduct(productId);

    res.status(200).send(addQuantity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
