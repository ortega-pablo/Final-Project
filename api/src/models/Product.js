const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keyWords: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    netWeight: {
      type: DataTypes.FLOAT,
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDimensions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageDimensions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grossWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    warranty: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
