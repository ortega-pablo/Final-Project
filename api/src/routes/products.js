const { Router } = require("express");
const { Product, Discount, Category, Specification, ProductSpecification, SubCategory  } = require("../db");
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


module.exports = router;
