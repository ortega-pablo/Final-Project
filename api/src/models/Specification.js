const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("specification", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
};