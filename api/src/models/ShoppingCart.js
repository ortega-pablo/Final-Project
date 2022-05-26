const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shoppingCart", {
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    shippingAddress: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
  });
};