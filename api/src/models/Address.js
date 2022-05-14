const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("address", {
    addressLine1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.TEXT,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};