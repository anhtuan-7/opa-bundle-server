const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const UserModel = require("./users.js");

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

// Sync the models with the database
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database and models are in sync.");
//   })
//   .catch((error) => {
//     console.error("Error syncing models:", error);
//   });

module.exports = RoleModel;
