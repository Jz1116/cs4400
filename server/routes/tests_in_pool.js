// tests_in_pool
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/result", (req, res) => {
  
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { pool_id } = form;

  const test_in_pool_result = `CALL tests_in_pool('${pool_id}')`;

  db.query(test_in_pool_result, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from tests_in_pool_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
        return new Date(a.date_tested) - new Date(b.date_tested);
    });
  
      const test_in_pool = result.map((row) => {
        const formalDate = moment.utc(row.date_tested).format("M/D/YY");

      return {
          test_id : row.test_id,
          date_tested : formalDate,
          testing_site : row.testing_site,
          test_result : row.test_result,
        };
    });

    res.status(200).json(test_in_pool);
  });
});

module.exports = router;