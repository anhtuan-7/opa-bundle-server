const tar = require("tar");
const { updateUsers } = require("../opa/users.js");

async function makeBundle(bundlePath) {
  tar
    .c(
      {
        gzip: true,
        file: `${bundlePath}/bundle.tar.gz`,
      },
      [
        "./src/data/.manifest",
        "./src/data/policy/",
        "./src/data/roles/",
        "./src/data/users/",
      ]
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
  //update data file
  await updateUsers("./src/data/users/data.json");
  await makeBundle("./src/bundle");
}

// update();
module.exports = update;
