const { Router } = require("express");
const { Product, Discount, Category, Specification, ProductSpecification, SubCategory, ProductInventory  } = require("../db");
const { getAllProducts, getProductsByName , orderProducts } = require("../controllers/products");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {

      const productsByName = await getProductsByName(name)
      
      if (productsByName.length>=1){
        orderedProductsByName = await orderProducts(productsByName)
        return res.status(200).send(orderedProductsByName)
      }else{
        return res.status(404).send("No matching products found.");
      }
    } else {
      const allProducts = await getAllProducts();
      res.status(200).send(allProducts);
    }
  } catch (error) {
    next(error);
  }
});


router.post("/", async (req, res, next) => {
  const {
    name,
    sku,
    brand,
    keyWords,
    price,
    netWeight,
    description,
    thumbnail,
    image,
    productDimensions,
    packageDimensions,
    grossWeight,
    warranty,
    quantity
  } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      sku,
      brand,
      keyWords,
      price,
      netWeight,
      description,
      thumbnail,
      image,
      productDimensions,
      packageDimensions,
      grossWeight,
      warranty,
    });

    const addQuantity = await ProductInventory.create({
      quantity,
    });


    addQuantity.setProduct(newProduct);

    res.status(200).send(newProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/addCategory", async (req, res, next) => {
  try {
    const { productId, categoryId } = req.query;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    });

    await category.addProduct(product);

    res.status(200).send("Successfully associated category.");
  } catch (error) {
    next(error);
  }
});

router.post("/addSubCategory", async (req, res, next) => {
  try {
    const { productId, subCategoryId } = req.query;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    const subCategory = await SubCategory.findOne({
      where: {
        id: subCategoryId,
      },
    });

    await subCategory.addProduct(product);

    res.status(200).send("Successfully associated sub category.");
  } catch (error) {
    next(error);
  }
});

router.post("/addDiscount", async (req, res, next) => {
  try {
    const { productId, discountId } = req.query;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    const discount = await Discount.findOne({
      where: {
        id: discountId,
      },
    });

    await discount.addProduct(product);

    res.status(200).send("Successfully associated discount.");
  } catch (error) {
    next(error);
  }
});


router.post("/addSpecification", async (req, res, next) => {
  try {
    const { value } = req.body;
    const { productId, specificationId } = req.query;

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    const specification = await Specification.findOne({
      where: {
        id: specificationId,
      },
    });
 
    console.log(product)
    console.log(specification)
    
    product.addSpecification(specification , {through:{value:value}})

    res.status(200).send("Successfully associated Specification.");
  } catch (error) {
    next(error);
  }
});


router.put("/", async (req, res, next) => {
  const {productId, discountId, categoryId, subCategoryId, specificationId} = req.query;
 
  
  const {
      name,
      sku,
      brand,
      keyWords,
      price,
      netWeight,
      description,
      thumbnail,
      image,
      productDimensions,
      packageDimensions,
      grossWeight,
      warranty,
    } = req.body;

  try {

    const findProduct = await Product.findOne({  /////////// Trae el producto y sus modelos ///////////
      where: {
          id: productId
      },
      include: [
        {
          model: Discount,
          attributes: ["id", "name", "description", "discountPercent", "active"],
          through: {
            attributes: [],
          },
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
        },
        {
          model: Specification,
          attributes: ["id", "name"],
          through: {
              as:"value:",
              attributes: ["value"],
          },
        }
      ],
  })


      if(findProduct){
         

        if(discountId){

          const findDiscount = await Discount.findOne({  /////////// Trae el producto y sus descuentos ///////////
            where: {
              id: discountId
            }
          })

          findDiscount && findProduct.removeDiscount(discountId) ?
          res.status(200).send("Discount removed successfully!") :
          res.send("No discount associated with this product")

        }

        else if(categoryId) {

          const findCategory = await Category.findOne({
            where: {
              id: categoryId
            }
          })

          findCategory && findProduct.removeCategory(categoryId) ?
          res.status(200).send("Category removed successfully!") :
          res.send("No category associated with this product")
        } 

        else if(subCategoryId){
          const findSubCategory = await SubCategory.findOne({
            where: {
              id: subCategoryId
            }
          })

          findSubCategory && findProduct.removeSubCategory(subCategoryId) ?
          res.status(200).send("SubCategory removed successfully!") :
          res.send("No Subcategory associated with this product")
        }

        else if(specificationId){
          const findSpecification = await Specification.findOne({
            where: {
              id: specificationId
            }
          })

          findSpecification && findProduct.removeSpecification(specificationId) ?
          res.status(200).send("SubCategory removed successfully!") :
          res.send("No Subcategory associated with this product")
        }

        else {
             await Product.update({
              name,
              sku,
              brand,
              keyWords,
              price,
              netWeight,
              description,
              thumbnail,
              image,
              productDimensions,
              packageDimensions,
              grossWeight,
              warranty,
          },
          {
              where: {
                  id: productId
              }
          }
          )

          res.send("Entry updated successfully!")
        }
        
      } else {
        res.send("Product ID not found");
      }

  } catch(error){
    next(error)
  }
})

router.delete("/:productId", async (req, res, next) => {

  const {productId} = req.params
  try {
    
      const deleteProduct = await Product.findOne({
          where: {
              id: productId
          }
      })

      if(deleteProduct){
        await Product.destroy({
          where: {
              id: productId
          }
      })

      res.send("Product removed successfully!")
     
      } else {
        res.send("Product ID not found");
      }

  } catch(error){
    res.send(error)
  }
})

module.exports = router;
