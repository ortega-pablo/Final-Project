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
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
<<<<<<< HEAD
    // Payment_Status: {
    //   type: DataTypes.STRING,
    // }
=======
    paymentState: {
      type: DataTypes.TEXT,
    }
>>>>>>> 129edc743594fa37225c4e210905aa396ea3e39a
  });
};