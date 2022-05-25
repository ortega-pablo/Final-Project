const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("review", {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    review: {
        type:DataTypes.TEXT,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  });
};