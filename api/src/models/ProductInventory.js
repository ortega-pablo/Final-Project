const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("productInventory", {
    quantity: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0
    },
  });
};