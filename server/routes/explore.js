// explore_result
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/result", (req, res) => {
  
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { test_id } = form;

  const exploreResult = `CALL explore_results('${test_id}')`;

  db.query(exploreResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from explore_results_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const studentResult = result.map((row) => {
      const formalDate = moment.utc(row.test_date).format("M/D/YY");
      const formalDate2 = moment.utc(row.date_processed).format("M/D/YY");

      return {
        test_id: row.test_id,
        test_date: formalDate,
        timeslot: row.timeslot,
        testing_location: row.testing_location,
        date_processed: formalDate2,
        pooled_result: row.pooled_result,
        individual_result: row.individual_result,
        processed_by: row.processed_by,
      };
    });

    res.status(200).json(studentResult);
  });
});

module.exports = router;