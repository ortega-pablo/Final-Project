const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("payment", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
