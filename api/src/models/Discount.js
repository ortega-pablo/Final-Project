const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("discount", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    discountPercent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};