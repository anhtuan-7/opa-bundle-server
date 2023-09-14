const tar = require("tar");

const { updateUsers } = require("../opa/users.js");

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
  //update data file
  await updateUsers(`${__dirname}/users/data.json`);
  await makeBundle(`${__dirname}/../bundle`);

  const endTime = performance.now();
  console.log(`Update takes ${endTime - startTime}ms`);
}

async function push(tableToUpdate) {
  const startTime = performance.now();
  //update data file
  await updateUsers(`${__dirname}/users/data.json`);

  const endTime = performance.now();
  console.log(`Push takes ${endTime - startTime}ms`);
}

//update();
module.exports = update;
