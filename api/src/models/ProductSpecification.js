const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("productSpecification", {
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
