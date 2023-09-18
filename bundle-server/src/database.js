const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("access-data", "postgres", "1", {
  host: "172.22.96.1",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
