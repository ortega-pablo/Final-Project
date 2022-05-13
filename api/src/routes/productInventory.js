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



router.get("/", async (req, res, next) => {

  const {productId} = req.query

  try{
    if(productId) {

      const findByQuantity = await Product.findAll()
      const found = await findByQuantity?.filter(e => e.firstName.toLowerCase().includes(firstName.toLowerCase()));

      
      found.length ? res.status(200).json(found) : res.json("User not found, please try another search");

    } else {
      const getAll = await ProductInventory.findAll()
      return res.status(200).send(getAll)
    }
  } catch(error){
    res.send(error)
  }
  
})

module.exports = router;
