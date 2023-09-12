const tar = require("tar");
const { updateUsers } = require("../opa/users.js");

async function makeBundle(bundlePath = "../bundle") {
  tar
    .c(
      {
        gzip: true,
        file: `${bundlePath}/bundle.tar.gz`,
      },
      [".manifest", "policy/", "roles/", "users/"]
    )
    .then(() => {
      console.log("Bundle file has been created.");
    })
    .catch(() => {
      console.log("Failed to create bundle.");
    });
}

makeBundle();

async function update(tableToUpdate) {
  //update data file
  await updateUsers();
  await makeBundle();
}

// update();
module.exports = update;
