
const {Router} = require("express");
const router = Router();

const {Product, Specification, ProductSpecification} = require("../db")

router.post("/", async (req, res, next) => {

    const {name, value} = req.body;
    const {productId, specificationId} = req.query

    try{
        
      if(productId){

        const specificationValue = await ProductSpecification.create({
            value
        });

        const specValue = await Specification.findOne({
            where: {
                id: specificationId
            }
        })
    
        specificationValue.addSpecification(specValue)

        return res.status(200).send(specificationValue)
      }


    } catch(error){
        next(error)
    }
});



module.exports = router;
