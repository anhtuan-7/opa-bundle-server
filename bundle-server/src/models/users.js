// const { check } = require("../database.js");
// check();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

// define the Users model
const UserModel = sequelize.define(
  "users",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    passwordhash: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"), // Set to the current timestamp
    },
  },
  {
    tableName: "users", // Set the table name (if it differs from the model name)
  }
);

// Synchronize the model with the database (create the table if it doesn't exist)
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Users table created (if it doesn't exist)");
//   })
//   .catch((error) => {
//     console.error("Error creating Users table:", error);
//   });

module.exports = UserModel;
