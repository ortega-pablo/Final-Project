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

    res.status(200).send(newDiscount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;