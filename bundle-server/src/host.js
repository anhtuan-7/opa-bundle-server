const { exec } = require("node:child_process");

exec("grep nameserver /etc/resolv.conf | awk '{print $2}'", (err, output) => {
  if (err) {
    console.error("could not execute command: ", err);
    return;
  }
  const host = output;
  console.log("Output: ", host);
});

module.exports = host;
