const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const sequelize = new Sequelize("access-data", "postgres", "1", {
  host: "172.24.208.1",
  dialect: "postgres",
  define: {
    timestamps: false, // Set to true if your table has created_at and updated_at columns
  },
});

// async function connectToDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// connectToDatabase();
//OK

// exports.check = connectToDatabase;
module.exports = sequelize; //Default
