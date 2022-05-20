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

router.get("/:discountId", async (req, res) => {

  const {discountId} = req.params

  try {
    if(discountId) {
      const findById = await Discount.findOne({
        where: {
          id: discountId
        },
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

      return res.send(findById)

    } else{
      return res.status(404).send("Discount not found")
    }
  } catch(error){
    res.send(error)
  }
})

router.put("/:discountId", async (req, res, next) =>{

  const {discountId} = req.params;
  const { name, description, discountPercent, active } = req.body;

  try {

    const findDiscount = await Discount.findOne({
      where: {
        id: discountId
      }
    })

    
    if(findDiscount) {
      await Discount.update({
        name,
        description,
        discountPercent,
        active
        },
        {
        where: {
            id: discountId
        }
      })
      res.status(200).send("Discount updated successfully!")

    } else {
      res.send("Discount not found")
    }
        
  } catch(error){
    next(error)
  }
})


router.delete("/:discountId", async (req, res, next) => {

  const {discountId} = req.params;

  try {
    
  const findDiscount = await Discount.findOne({
    where: {
      id: discountId
    }
  })

  if(findDiscount) {

    await Discount.destroy({
      where: {
        id: discountId
      }
    })

    res.status(200).send("Discount deleted successfully")
  } 
  else {
    res.send("Discount not found")
  }

  } catch(error){
    next(error)
  }
})



module.exports = router;