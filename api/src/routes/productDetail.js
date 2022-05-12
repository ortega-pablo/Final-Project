const { Router } = require("express");
const router = Router();

const { Product, Ask, Answer, Discount, Category, Specification, ProductInventory, SubCategory } = require("../db");



const productInfo = async function (id, categoryId) {

    const getProduct = await Product.findOne({
        where: {
            id
        },
        include: [
        {
            model: Specification,
            attributes: ["id", "name"],
            through: {
                as:"value:",
                attributes: ["value"],
            },
        },
        {
            model: ProductInventory,
            attributes: ["quantity"],
        },
        {
            model: Discount,
            attributes: ["name", "description", "discountPercent", "active"],
            through: {
                attributes: [],
            }
        },
        {
            model: Category,
            attributes: ["name", "description", "thumbnail"],
            include: [
                {
                    model: SubCategory,
                    attributes: ["name", "description", "thumbnail"]
                }
            ]
        },
        {
            model: Ask,
            attributes: ["content"],
            include: [
                {
                    model: Answer,
                    attributes: ["content"]
                }
            ]
        }]
    })


    let temp = [];
    temp.push(getProduct)
    

    return temp;
}


router.get("/:productId", async (req, res, next) => {

    const { productId, categoryId } = req.params


    try {
        if (productId) {
            const productFound = await productInfo(productId, categoryId)

            return res.status(200).send(productFound)
        }
    } catch (error) {
        next("Product not found")
    }
})


module.exports = router;