const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shoppingCart", {
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
  });
};