const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shoppingCart", {
    ammount: {
      type: DataTypes.FLOAT,
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