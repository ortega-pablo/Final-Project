const { Router } = require("express");
const router = Router();

const { ProductSpecification, Specification, Product } = require("../db");

router.post("/", async (req, res, next) => {
  const { name } = req.body;

  try {
    const addSpecification = await Specification.create({
      name,
    });

    res.status(200).send(addSpecification);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  
  const {name, productId} = req.query

  try{
    if(name){

      const getProduct = await Product.findAll({
        include: [
          {
            model: Specification,
            attributes: ["id", "name"],
            through: {
                as:"value:",
                attributes: ["value"],
            },
        }
        ]
      })
      // res.status(200).send(getProduct)
      // const found = await getProduct?.filter(e => e.name.toLowerCase().includes(e.specifications.name.toLowerCase()));

      // found.length ? res.status(200).json(found) : res.json("User not found, please try another search");
      res.status(200).send(getProduct)

    }
   
  }catch(error){
    next(error)
  }
})


module.exports = router;
