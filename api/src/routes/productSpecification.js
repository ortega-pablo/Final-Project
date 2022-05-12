const {Router} = require("express");
const router = Router();

const {Product, ProductSpecification} = require("../db")

router.post("/", async (req, res, next) => {

    const {value} = req.body;
    const {productId} = req.query

    try{
        const addAttribute = await ProductSpecification.create({
            value,
        });

        const product = await Product.findOne({
            where: {
                id: productId,
            }
        });

        addAttribute.addProduct(productId);

        res.status(200).send(addAttribute);

    } catch(error){
        next(error)
    }
});



module.exports = router;