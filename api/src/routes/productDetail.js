const { Router } = require("express");
const router = Router();

const { Product, Ask, Answer, Discount, Category, Specification, ProductInventory, SubCategory, Image } = require("../db");



const productInfo = async function (id) {

    const getProduct = await Product.findOne({
        where: {
            id
        },
        include: [
        {
            model: ProductInventory,
            attributes: ["quantity"],
        },
        {
            model: Discount,
            attributes: ["id", "name", "description", "discountPercent", "active"],
            through: {
                attributes: [],
            }
        },
        {
            model: Category,
            attributes: ["id", "name", "description", "thumbnail"],
            through: {
                attributes: [],
            },
        },
        {
            model: SubCategory,
            attributes: ["id", "name", "description", "thumbnail"],
            through: {
              attributes: [],
            },
            include:[
                {
                    model: Category,
                    attributes: ["id", "name", "description", "thumbnail"],
                    through: {
                        attributes: [],
                    },
                }
            ]
          },
        {
            model: Specification,
            attributes: ["id", "name"],
            through: {
                attributes: ["value"],
            },
        },  
        {
            model: Ask,

            order: [['createdAt', 'ASC']],
            attributes: ["id", "content", "createdAt"],
            include: [
                {
                    model: Answer,
                    attributes: ["id", "content", "createdAt"]
                }
            ]
        },
        {
            model: Image,
            through: {
              attributes: [],
            },
          },
          
    ]
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