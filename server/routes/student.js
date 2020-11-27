const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.post("/create", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, email, fname, lname, location, housing, password } = form;

  const registerStudent = `CALL register_student('${username}', '${email}', '${fname}', '${lname}', '${location}', '${housing}', '${password}')`;

  db.query(registerStudent, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

router.post("/result", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { status, startDate, endDate } = form;
  const { username } = form;

  const str1 = "'";

  if (status !== null) {
    status = str1.concat(status);
    status = status.concat(str1);
  }

  if (startDate !== null) {
    startDate = str1.concat(startDate);
    startDate = startDate.concat(str1);
  }

  if (endDate !== null) {
    endDate = str1.concat(endDate);
    endDate = endDate.concat(str1);
  }

  const getStudentResult = `CALL student_view_results('${username}', ${status}, ${startDate}, ${endDate})`;

  db.query(getStudentResult, true, (error) => {
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
      const formalDateProcessed = moment
        .utc(row.date_processed)
        .format("M/D/YY");

      return {
        testId: row.test_id,
        date: formalDate,
        dateProcessed:
          formalDateProcessed === "Invalid date" ? null : formalDateProcessed,
        poolStatus: row.pool_status,
        testStatus: row.test_status,
      };
    });

    res.status(200).json(studentResult);
  });
});

router.get("/result/:testId", (req, res) => {
  const { testId } = req.params;

  const exploreResult = `CALL explore_results(${testId})`;

  db.query(exploreResult, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from explore_results_result";

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const testResult = result.map((row) => {
      const formalDate = moment.utc(row.test_date).format("M/D/YY");
      const formalDateProcessed = moment
        .utc(row.date_processed)
        .format("M/D/YY");

      return {
        testId: row.test_id,
        testDate: formalDate,
        timeslot: row.timeslot,
        testingLocation: row.testing_location,
        processDate: formalDateProcessed,
        poolResult: row.pooled_result,
        individualResult: row.individual_result,
        processedBy: row.processed_by,
      };
    });
    console.log(testResult);
    res.status(200).json(testResult);
  });
});

module.exports = router;
