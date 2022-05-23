const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("image", {
    urlFile: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
