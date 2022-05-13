const { Product, Discount, Category, SubCategory, Specification, ProductSpecification, ProductInventory } = require("../db");
const { Op } = require("sequelize");

const getAllProducts = async () => {
  return await Product.findAll({
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
        },
      },
      {
        model: Category,
        attributes: ["id", "name", "description", "thumbnail"],
        through: {
          attributes: [],
        },
        include: {
          model: SubCategory,
          attributes: ["id", "name", "description", "thumbnail"],
          through: {
            attributes: [],
          },
        },
      },
      {
        model: Specification,
        attributes: ["id", "name"],
        through: {
          as:"value:",
          attributes: ["value"],
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
        include: {
          model: SubCategory,
          attributes: ["id", "name", "description", "thumbnail"],
          through: {
            attributes: [],
          },
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