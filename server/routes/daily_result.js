// daily_result
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/daily", (req, res) => {
  const getDailyResult = `CALL daily_results()`;

  db.query(getDailyResult, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from daily_results_result";
  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
    result.sort((a, b) => {
      return new Date(a.process_date) - new Date(b.process_date);
    });

    const dailyResult = result.map((row) => {
      const formalDate = moment.utc(row.process_date).format("M/D/YY");

      return {
        process_date: formalDate,
        num_tests: row.num_tests,
        pos_tests: row.pos_tests,
        pos_percent: `${row.pos_percent}%`,
      };
    });

    res.status(200).json(dailyResult);
  });
});

module.exports = router;
