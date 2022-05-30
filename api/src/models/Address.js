const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("address", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};