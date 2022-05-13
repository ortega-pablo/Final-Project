const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shoppingCart", {
    ammount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
};