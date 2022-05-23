const { Router } = require("express");
const router = Router();

const { Product, ProductInventory } = require("../db");

// router.post("/", async (req, res, next) => {
//   const { quantity } = req.body;
//   const { productId } = req.query;

//   try {
  
//     const product = await Product.findOne({
//       where: {
//         id: productId,
//       },
//     });

//     if(product) {

//       const addQuantity = await ProductInventory.create({
//         quantity,
//       });
  

//       addQuantity.setProduct(productId);
//       res.status(200).send(addQuantity);
      
//     } else {
//       res.send("Product not found")
//     }
    
   
//   } catch (error) {
//     next(error);
//   }
// });



router.get("/", async (req, res, next) => {

  const { productId } = req.query

  try {
    if (productId) {

      const getStockOne = await ProductInventory.findOne({
        where: {
          productId
        },
        include: [
          {
            model: Product,
            attributes: ["name"]
          }
        ]
      })

      if(getStockOne){

        const info = {
          name: getStockOne.product.name,
          productId: getStockOne.productId,
          quantity: getStockOne.quantity,
          createdAt: getStockOne.createdAt,
          updatedAt: getStockOne.updatedAt
        }
        return res.status(200).send(info)

      } else {
        return res.send("Product not found")
      }
      

    } else {
      const getAllInventory = await ProductInventory.findAll({
        include: [
          {
            model: Product,
            attributes: ["name"]
          }
        ]
      });

      if(getAllInventory){

        const mapped = getAllInventory.map(e => {
          return {
            name: e.product.name,
            productId: e.productId,
            quantity: e.quantity && e.quantity,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
          }
        })
  
        return res.status(200).send(mapped)
      }
      else {
        return res.send("Products not found")
      }
    }

  } catch (error) {
    res.send(error)
  }

})

router.put("/:productId", async (req, res, next) =>{

  const {productId} = req.params;
  const { quantity } = req.body;

  try {

    const findProduct = await Product.findOne({
      where: {
        id: productId
      }, 
      include: [
        {
          model: ProductInventory,
          attributes: ["quantity"],
        },
      ]
    })


    
    if(findProduct && findProduct.productInventory) {

      await ProductInventory.update({
        quantity,
        },
        {
        where: {
            productId
        }
      })
      res.status(200).send("Stock updated successfully!")

    } else {
      res.send("Product or stock not found")
    }
        
  } catch(error){
    next(error)
  }
})



module.exports = router;
