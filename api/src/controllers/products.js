const { Product, Discount, Category, SubCategory, Specification, ProductSpecification, ProductInventory, Image, Review } = require("../db");
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
          attributes: ["value"],
        },
      },
      {
        model: Image,
        through: {
          attributes: [],
        },
      },
      {
        model: Review,
      },
      
    ], 
  });
};

const getProductsByName = async (name) => {
   let products = await Product.findAll({
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
            attributes: ["value"],
        },
      },
      {
        model: Image,
        through: {
          attributes: [],
        },
      },
   /*    {
        model: Review,
        through: {
          attributes: [],
        },
      }, */
    ],
  });
  let fixedProducts = products.filter(p => p.dataValues.name.toLowerCase().includes(name.toLowerCase()))
  return fixedProducts;
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
