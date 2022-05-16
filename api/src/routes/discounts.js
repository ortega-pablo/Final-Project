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



router.get("/", async (req, res, next) => {

  const {name} = req.query

  try{
    if(name) {

      const findByName = await Discount.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            through: {
              attributes: []
            }
          }
        ]
      })
      const found = await findByName?.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

      
      found.length ? res.status(200).json(found) : res.json("Discount not found, please try another search");

    } else {
      const getAll = await Discount.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
            through: {
              attributes: []
            }
          }
        ]
      })
      return res.status(200).send(getAll)
    }
  } catch(error){
    res.send(error)
  }
  
})



module.exports = router;