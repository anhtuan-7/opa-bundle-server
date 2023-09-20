const fs = require("fs");
const { exec } = require("node:child_process");

console.log("Getting database host address");

exec("grep nameserver /etc/resolv.conf | awk '{print $2}'", (err, output) => {
  if (err) {
    console.error("could not execute command: ", err);
    return;
  }
  fs.writeFileSync("./host.txt", output);
});
