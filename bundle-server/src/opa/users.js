const fs = require("fs");
const { fetchUsers } = require("../services/users.js");

async function makeUsersData(filePath) {
  users = await fetchUsers();

  data = { users: {} };

  users.forEach((user) => {
    user_id = user.dataValues.userid;
    data[user_id] = {
      username: user.dataValues.username,
      roles: user.dataValues.roles.map((role) => role.roleid),
    };
  });

  jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
}

exports.updateUsers = makeUsersData;
