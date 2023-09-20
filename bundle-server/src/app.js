const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const { Client } = require("pg");

const update = require("./data/utils");

const app = express();

app.use(morgan("dev"));

let lastUpdate = Date.now();
let lastRequest = 0;

const HOST = "0.0.0.0";
const PORT = 8080;

const host = fs.readFileSync(`${__dirname}/host.txt`, "utf8").trim();

const client = new Client({
  user: "postgres",
  host: host,
  database: "access-data",
  password: "1",
  port: 5432,
});

client.connect((err, client) => {
  if (err) {
    console.error(err);
  } else {
    client.on("notification", async (msg) => {
      table = JSON.parse(msg.payload)["table"];
      await update(table);
      lastUpdate = Date.now();
    });
    client.query("LISTEN events");
    console.log("Connected to PostgreSQL");
    console.log("Listening....");
  }
});

app.get("/bundles/:filename", (req, res) => {
  const filePath = __dirname + "/bundle/" + req.params.filename;
  res.download(filePath, "bundle.tar.gz", (err) => {
    if (err) {
      res.send({
        error: err,
        msg: "Problem downloading the file",
      });
    }
  });
});

app.get("/bundles/:filename/long-polling", (req, res) => {
  console.log("New Request: ", Date.now() / 1000);
  const filePath = __dirname + "/bundle/" + req.params.filename;

  res.set({
    "Content-Type": "application/vnd.openpolicyagent.bundles",
  });

  const timeoutId = setTimeout(() => {
    res.status(304).send("");
  }, 9500);

  const maxCount = 9;
  let count = 0;

  const id = setInterval(() => {
    count++;
    if (count >= maxCount) clearInterval(id);
    if (lastRequest < lastUpdate) {
      lastRequest = Date.now();
      res.download(filePath, "bundle.tar.gz", (err) => {
        if (err) {
          res.send({
            error: err,
            msg: "Problem downloading the file",
          });
        }
      });
      clearTimeout(timeoutId);
      return clearInterval(id);
    }
  }, 1000);
});

app.listen(PORT, HOST, () => console.log("Server listening to port " + PORT));
