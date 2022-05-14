const { Router } = require("express");
const router = Router();

const { Specification, Product } = require("../db");

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
  
  const {specificationId, productId} = req.query

  try{
    if(productId){
      
    }

  }catch(error){
    next(error)
  }
})



module.exports = router;
