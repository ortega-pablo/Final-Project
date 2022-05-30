const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    total: {
      type: DataTypes.FLOAT,
    },
    state: {
      type: DataTypes.ENUM,
      values: ["created", "processing", "shipped", "cancelled", "completed"],
      defaultValue: "created",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    }
  });
};