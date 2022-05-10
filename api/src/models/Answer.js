const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("answer", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
