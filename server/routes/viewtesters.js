//view testers
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/done", (req, res) => {

  const test_sign_up = `CALL view_testers()`;

  db.query(test_sign_up, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from view_testers_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

  
      const sign_up_filter = result.map((row) => {

      return {
          username : row.username,
          name : row.name,
          phone_number : row.phone_number,
          assigned_sites : row.assigned_sites,
        };
    });

    res.status(200).json(sign_up_filter);
  });
});

module.exports = router;