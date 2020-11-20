const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mysql = require("mysql");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

require("dotenv").config();

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE,
  port: "3306",
});

connection.connect((err) => {
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

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(5000, () => console.log("Node server listening on port 5000!"));

module.exports = app;
