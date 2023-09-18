const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const ActionModel = sequelize.define(
  "actions",
  {
    actionid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actionname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    tableName: "actions",
  }
);


module.exports = ActionModel;
