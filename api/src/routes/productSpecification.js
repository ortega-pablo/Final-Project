const {Router} = require("express");
const router = Router();

const {Product, Specification, ProductSpecification} = require("../db")

router.post("/", async (req, res, next) => {

    const {name, value} = req.body;
    const {productId, specificationId} = req.query

    try{
      if(productId){

        const newSpecification = await Specification.create({
            name,
        });

        const product = await Product.findOne({
            where: {
                id: productId,
            }
        });
        

        newSpecification.addProduct(productId);

        res.status(200).send(newSpecification);
      }

    } catch(error){
        next(error)
    }
});



module.exports = router;