const { Product, Discount, Category } = require("../db");
const { Op } = require("sequelize");

const getAllProducts = async () => {
  return await Product.findAll({
    attributes: [
      "id",
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
      "createdAt",
      "updatedAt",
    ],
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
    ], 
  });
};

const getProductsByName = async (name) => {
  return await Product.findAll({
   
    where: {
      name: {
        [Op.substring]: name,
      },
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
        where: {},
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const orderProducts = async (arr) => {
  return await arr.sort((a, b) => {
    if (a.name.length > b.name.length) {
      return 1;
    } else if (a.name.length < b.name.length) {
      return -1;
    } else {
      return 0;
    }
  });
};

module.exports = {
  getAllProducts,
  getProductsByName,
  orderProducts,
};
