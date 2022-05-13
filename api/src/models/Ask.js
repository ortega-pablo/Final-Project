const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ask", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};