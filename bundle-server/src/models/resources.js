const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const PermissionModel = require("./permissions.js");

const ResourceModel = sequelize.define(
  "resources",
  {
    resourceid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resourcename: {
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
    tableName: "resources",
  }
);

module.exports = ResourceModel;
