const fs = require("fs");
const { Sequelize } = require("sequelize");

require("./host.js");
const host = fs.readFileSync(`${__dirname}/host.txt`, "utf8").trim();

const sequelize = new Sequelize("access-data", "postgres", "1", {
  host: host,
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
