const express = require("express");
const morgan = require("morgan");
const { Client } = require("pg");

const push = require("./opa/utils");

const app = express();

app.use(morgan("dev"));

const HOST = "0.0.0.0";
const PORT = 8080;

const client = new Client({
  user: "postgres",
  host: "172.24.80.1",
  database: "access-data",
  password: "1",
  port: 5432,
});

client.connect((err, client) => {
  if (err) {
    console.error(err);
  } else {
    client.on("notification", (msg) => {
      //console.log(msg.payload); //{"table" : "products", "action" : "INSERT", "data" : {"id":1,"name":"bag","quantity":100000}}
      table = JSON.parse(msg.payload)["table"];
      push(table);
    });
    client.query("LISTEN events");
    console.log("Connected to PostgreSQL");
  }
});

app.listen(PORT, HOST, () => console.log("Server listening to port " + PORT));
