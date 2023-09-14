const { updateUsers } = require("./users.js");

async function push(tableToUpdate) {
  const startTime = performance.now();
  await updateUsers(
    "/mnt/f/Bootcamps/Tools Pack/OPA/rbac-demo/opa-server-push/users/data.json"
  );
  const endTime = performance.now();
  console.log(`Push takes ${endTime - startTime}ms`);
}

module.exports = push;
