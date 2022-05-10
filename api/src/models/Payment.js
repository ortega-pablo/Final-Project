const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("payment", {
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
