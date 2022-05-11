const { Router } = require("express");
const { Discount, Product } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, description, discountPercent, active } = req.body;
  const { productId } = req.query;

  try {
    const newDiscount = await Discount.create({
      name,
      description,
      discountPercent,
      active,
    });

    const product = await Product.findAll({
      where: {
        id: productId,
      },
    });

    newDiscount.addProduct(productId);

    res.status(200).send(newDiscount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
