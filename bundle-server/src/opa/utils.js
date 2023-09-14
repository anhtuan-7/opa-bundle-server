const { updateUsers } = require("./users.js");
const { updateRoles } = require("./roles.js");

const update = {
  users: updateUsers,
  user_roles: updateUsers,
  roles: updateRoles,
};

const path = {
  users: "users",
  user_roles: "users",
  roles: "roles",
};

async function push(tableToUpdate) {
  console.log(tableToUpdate);
  const startTime = performance.now();
  await update[tableToUpdate](
    `/mnt/f/Bootcamps/Tools Pack/OPA/rbac-demo/opa-server-push/${path[tableToUpdate]}/data.json`
  );
  const endTime = performance.now();
  console.log(`Push takes ${endTime - startTime}ms`);
}

module.exports = push;
