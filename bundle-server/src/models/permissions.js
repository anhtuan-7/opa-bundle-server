const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const ActionModel = require("./actions.js");
const ResourceModel = require("./resources.js");

const PermissionModel = sequelize.define(
  "permissions",
  {
    permissionid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actionid: {
      type: DataTypes.INTEGER,
      references: {
        model: ActionModel,
        key: "actionid",
      },
    },
    resourceid: {
      type: DataTypes.INTEGER,
      references: {
        model: ResourceModel,
        key: "resourceid",
      },
    },
  },
  {
    tableName: "permissions",
  }
);

ResourceModel.hasMany(PermissionModel);
ActionModel.hasMany(PermissionModel);

PermissionModel.belongsTo(ResourceModel, { foreignKey: "resourceid" });
PermissionModel.belongsTo(ActionModel, { foreignKey: "actionid" });

module.exports = PermissionModel;
