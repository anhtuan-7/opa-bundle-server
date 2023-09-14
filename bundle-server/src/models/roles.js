const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const UserModel = require("./users.js");
const PermissionModel = require("./permissions.js");

const RoleModel = sequelize.define(
  "role",
  {
    roleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rolename: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "roles",
  }
);

const UserRole = sequelize.define(
  "user_roles",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: UserModel, // 'Movies' would also work
        key: "userid",
      },
    },
    roleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: RoleModel, // 'Movies' would also work
        key: "roleid",
      },
    },
  },
  {
    tableName: "user_roles",
  }
);

UserModel.belongsToMany(RoleModel, {
  through: "user_roles",
  foreignKey: "userid",
});
RoleModel.belongsToMany(UserModel, {
  through: "user_roles",
  foreignKey: "roleid",
});

const RolePermission = sequelize.define(
  "role_permissions",
  {
    roleid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: RoleModel, // 'Movies' would also work
        key: "roleid",
      },
    },
    permissionid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: PermissionModel, // 'Movies' would also work
        key: "permissionid",
      },
    },
  },
  {
    tableName: "role_permissions",
  }
);

PermissionModel.belongsToMany(RoleModel, {
  through: "role_permissions",
  foreignKey: "permissionid",
});
RoleModel.belongsToMany(PermissionModel, {
  through: "role_permissions",
  foreignKey: "roleid",
});

module.exports = RoleModel;
