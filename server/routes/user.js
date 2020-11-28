const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.get("/unique/:username", (req, res) => {
  const { username } = req.params;

  const checkUsername = `select * from user where username = '${username}'`;
  db.query(checkUsername, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }

    if (result.length === 0) {
      res.status(200).json({ isUnique: true });
    } else {
      res.status(200).json({ isUnique: false });
    }
  });
});

router.get("/unique/:fname/:lname", (req, res) => {
  const { fname, lname } = req.params;

  const checkUsername = `select * from user where fname = '${fname}' and lname = '${lname}'`;
  db.query(checkUsername, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }

    if (result.length === 0) {
      res.status(200).json({ isUnique: true });
    } else {
      res.status(200).json({ isUnique: false });
    }
  });
});

module.exports = router;
