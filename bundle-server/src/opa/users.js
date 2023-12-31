const fs = require("fs");
const axios = require("axios");
const { fetchUsers } = require("../services/users.js");

async function getUserData() {
  users = await fetchUsers();
  const data = {};

  users.forEach((user) => {
    user_id = user.dataValues.userid;
    data[user_id] = {
      username: user.dataValues.username,
      roles: user.dataValues.roles.map((role) => role.roleid),
    };
  });

  jsonData = JSON.stringify(data, null, 2);
  return jsonData;
}

async function writeUserData(filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
}

async function updateUsers(filePath) {
  jsonData = await getUserData();
  writeUserData(filePath, jsonData);
}

exports.updateUsers = updateUsers;
