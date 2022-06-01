const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderProducts", {
    productName: {
      type: DataTypes.STRING,
    },
    price:{
        type: DataTypes.FLOAT
    },
    quantity:{
        type: DataTypes.INTEGER
    },
    productId:{
        type: DataTypes.INTEGER
    },
    productImage:{
        type: DataTypes.TEXT,
    },
  });
};
