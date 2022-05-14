const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("image", {
    fileName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    urlFile: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateUpload: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
