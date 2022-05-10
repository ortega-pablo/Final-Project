const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderItems", {
    quantity: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  });
};
