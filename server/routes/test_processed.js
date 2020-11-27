// test processed
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/test", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let {start_date, end_date,test_status, lab_tech_username } = form;

  const str1 = "'";

  if (test_status === "NULL") {
    test_status = null;
  } else {
    test_status = str1.concat(test_status);
    test_status = test_status.concat(str1);
  }

  if (start_date === "NULL") {
    start_date = null; 
  } else {
    start_date = str1.concat(start_date);
    start_date = start_date.concat(str1);
  }

  if (end_date === "NULL") {
    end_date = null; 
  } else {
    end_date = str1.concat(end_date);
    end_date = end_date.concat(str1);
  }

  const test_sign_up = `CALL tests_processed(${start_date}, ${end_date}, ${test_status}, ${lab_tech_username})`;

  db.query(test_sign_up, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from covidtest_fall2020.tests_processed_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
        return new Date(a.test_date) - new Date(b.test_date);
      });
  
      const sign_up_filter = result.map((row) => {
        const formalDate = moment.utc(row.test_date).format("M/D/YY");
        const formalDate2 = moment.utc(row.process_date).format("M/D/YY");

      return {
          test_id : row.test_id,
          pool_id : row.pool_id,
          test_date : formalDate,
          process_date : formalDate2,
          test_status : row.test_status,
        };
    });

    res.status(200).json(sign_up_filter);
  });
});

module.exports = router;