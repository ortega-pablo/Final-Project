const { Router } = require("express");
const { Product, Discount, Category } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      attributes: [
        "name",
        "sku",
        "brand",
        "keyWords",
        "price",
        "netWeight",
        "description",
        "thumbnail",
        "image",
        "productDimensions",
        "packageDimensions",
        "grossWeight",
        "warranty",
      ],
      include: {
        model: Discount,
        attributes: ["name", "description", "discountPercent", "active"],
        through: {
          attributes: [],
        },
      },
      include: {
        model: Category,
        attributes: ["name", "description", "thumbnail"],
        where: {},
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).send(allProducts);
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

    console.log(productId)
    console.log(categoryId)
    console.log(product)
    console.log(category)

    await category.addProduct(product)

    res.status(200).send("Successfully associated category.");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
