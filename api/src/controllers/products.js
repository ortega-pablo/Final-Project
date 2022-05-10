const { Product } = require("../db");

const getAllProducts = async () => {
  return await Product.findAll({
    attributes: [
      "sku",
      "name",
      "brand",
      "keywords",
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
      model: Ask,
      attributes: ["content"],
      through: {
        attributes: [],
      },
      include: {
        model: Answer,
        attributes: ["content"],
        through: {
          attributes: [],
        },
      },
    },
  });
};




module.exports = {
    getAllProducts,
  };