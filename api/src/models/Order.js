const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      values: ["created", "processing", "cancelled", "completed"],
      defaultValue: "created",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};