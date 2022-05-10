const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("subCategory", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
