const tar = require("tar");

const { updateUsers } = require("../opa/users.js");
const { updateRoles } = require("../opa/roles.js");

const updateTable = {
  users: updateUsers,
  user_roles: updateUsers,
  roles: updateRoles,
  role_permissions: updateRoles,
};

const path = {
  users: "users",
  user_roles: "users",
  roles: "roles",
  role_permissions: "roles",
};

async function makeBundle(bundlePath) {
  tar
    .c(
      {
        gzip: true,
        file: `${bundlePath}/bundle.tar.gz`,
        cwd: __dirname,
      },
      [`.manifest`, `policy/`, `roles/`, `users/`]
    )
    .then(() => {
      console.log("Bundle file has been created.");
    })
    .catch((e) => {
      console.log("Failed to create bundle.");
      console.log(e);
    });
}

async function update(tableToUpdate) {
  const startTime = performance.now();

  await updateTable[tableToUpdate](
    `${__dirname}/${path[tableToUpdate]}/data.json`
  );
  await makeBundle(`${__dirname}/../bundle`);

  const endTime = performance.now();
  console.log(`Update takes ${endTime - startTime}ms`);
}

module.exports = update;
