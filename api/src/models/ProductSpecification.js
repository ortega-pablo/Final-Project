const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ProductSpecification", {
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};