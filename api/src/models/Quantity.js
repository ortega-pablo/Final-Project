const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Quantity", {
    total: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    }
  });
};