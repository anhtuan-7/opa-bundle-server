const fs = require("fs");
const axios = require("axios");
const { fetchRoles } = require("../services/roles.js");

async function getRoleData() {
  const roles = await fetchRoles();

  const data = {};

  roles.forEach((role) => {
    role_id = role.dataValues.roleid;

    const permissions = {};

    role.dataValues.permissions.forEach((permission) => {
      const resource = permission.resource.resourcename;
      const action = permission.action.actionname;
      if (!permissions[resource]) {
        permissions[resource] = [];
      }
      permissions[resource].push(action);
    });

    data[role_id] = {
      rolename: role.dataValues.rolename,
      permissions: permissions,
    };
  });

  jsonData = JSON.stringify(data, null, 2);
  return jsonData;
}

async function writeRoleData(filePath, data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully.");
    }
  });
}

async function updateRoles(filePath) {
  jsonData = await getRoleData();
  writeRoleData(filePath, jsonData);
}

exports.updateRoles = updateRoles;
