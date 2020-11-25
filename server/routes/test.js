const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/all", (req, res) => {
  const getAllTests = `SELECT test_id, appt_date FROM TEST where pool_id is null`;

  db.query(getAllTests, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const tests = result.map((row) => {
      return {
        testId: row.test_id,
        date: moment.utc(row.appt_date).format("M/D/YY"),
        checked: false,
      };
    });

    res.status(200).json(tests);
  });
});

module.exports = router;
