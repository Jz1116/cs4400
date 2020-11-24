const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mysql = require("mysql");
const md5 = require("md5");
const cors = require("cors");
const api = require("./routes");
require("dotenv").config();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE,
  port: "3306",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connect to database");
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api", api);

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);

  db.query(
    "select covidtest_fall2020.login_status(?, ?) as status",
    [username, hashedPassword],
    (error, result) => {
      if (error) {
        console.log(error);
      }

      const { status } = result[0];
      console.log(status);
      res.send({ status });
    }
  );
});

// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(5000, () => console.log("Node server listening on port 5000!"));

module.exports = app;
