// student_view_result
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/result", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { student_username, test_status, start_date, end_date } = form;

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
  

  const getStudentResult = `CALL student_view_results('${student_username}', ${test_status}, ${start_date}, ${end_date})`;

  db.query(getStudentResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from student_view_results_result";

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
    result.sort((a, b) => {
      return new Date(a.timeslot_date) - new Date(b.timeslot_date);
    });

    const studentResult = result.map((row) => {
      const formalDate = moment.utc(row.timeslot_date).format("M/D/YY");

      return {
        test_id: row.test_id,
        timeslot_date: formalDate,
        date_processed: row.date_processed,
        pool_status: row.pool_status,
        test_status: row.test_status,
      };
    });

    res.status(200).json(studentResult);
  });
});

module.exports = router;
