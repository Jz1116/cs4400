const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.get("/all", (req, res) => {
  const getAllTesters =
    "select concat(fname, ' ', lname) as full_name, username from sitetester join user on sitetester_username = username";

  db.query(getAllTesters, true, (error, result) => {
    if (error) {
      console.log(error);
    }

    const names = result.map((row) => {
      return [row.full_name, row.username];
    });

    res.status(200).json(names);
  });
});

module.exports = router;
