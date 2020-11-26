const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.post("/tests", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { startDate, endDate, testStatus, username } = form;

  const str1 = "'";

  if (testStatus !== null) {
    testStatus = str1.concat(testStatus);
    testStatus = testStatus.concat(str1);
  }

  if (startDate !== null) {
    startDate = str1.concat(startDate);
    startDate = startDate.concat(str1);
  }

  if (endDate !== null) {
    endDate = str1.concat(endDate);
    endDate = endDate.concat(str1);
  }

  const retrieveTests = `CALL tests_processed(${startDate}, ${endDate}, ${testStatus}, '${username}')`;

  db.query(retrieveTests, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult =
    "select * from covidtest_fall2020.tests_processed_result";

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
      return new Date(a.test_date) - new Date(b.test_date);
    });

    const processedTests = result.map((row) => {
      const formalDate = moment.utc(row.test_date).format("M/D/YY");
      const formalDateProcessed = moment.utc(row.process_date).format("M/D/YY");

      return {
        testId: row.test_id,
        poolId: row.pool_id,
        testDate: formalDate,
        processDate: formalDateProcessed,
        testStatus: row.test_status,
      };
    });

    res.status(200).json(processedTests);
  });
});

module.exports = router;
