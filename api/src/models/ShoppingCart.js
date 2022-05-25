const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shoppingCart", {
    amount: {
      type: DataTypes.INTEGER,
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