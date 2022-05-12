const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ProductSpecification", {
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
