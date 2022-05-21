const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("bannerImages", {

    urlImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  });
};