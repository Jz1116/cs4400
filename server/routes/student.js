const express = require("express");
const moment = require("moment");
const generateUniqueId = require("generate-unique-id");
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

router.get("/:username/location", (req, res) => {
  const { username } = req.params;

  const getLocation = `select location from student where student_username = '${username}'`;
  db.query(getLocation, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    res.status(200).json(result[0].location);
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

    res.status(200).json(testResult);
  });
});

router.post("/appts", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { siteName, startDate, endDate, startTime, endTime } = form;
  const { username } = form;

  const str1 = "'";

  if (startTime !== null) {
    startTime = str1.concat(startTime);
    startTime = startTime.concat(str1);
  }

  if (endTime !== null) {
    endTime = str1.concat(endTime);
    endTime = endTime.concat(str1);
  }

  if (siteName !== null) {
    siteName = str1.concat(siteName);
    siteName = siteName.concat(str1);
  }

  if (startDate !== null) {
    startDate = str1.concat(startDate);
    startDate = startDate.concat(str1);
  }

  if (endDate !== null) {
    endDate = str1.concat(endDate);
    endDate = endDate.concat(str1);
  }

  const testSignUp = `CALL test_sign_up_filter('${username}', ${siteName}, ${startDate}, ${endDate}, ${startTime}, ${endTime})`;

  db.query(testSignUp, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayAppts = "select * from test_sign_up_filter_result";

  db.query(displayAppts, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
      return new Date(a.appt_date) - new Date(b.appt_date);
    });

    const appts = result.map((row) => {
      const formalDate = moment.utc(row.appt_date).format("M/D/YY");

      return {
        date: formalDate,
        time: row.appt_time,
        address: row.street,
        siteName: row.site_name,
        checked: false,
      };
    });

    res.status(200).json(appts);
  });
});

router.post("/register/appt", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, siteName, date, time } = form;
  const testId = generateUniqueId({
    length: 6,
    useLetters: true,
  });

  const formalDate = moment(date, "M/D/YY").format("YYYY-MM-DD");

  const sql = `CALL test_sign_up('${username}', '${siteName}', '${formalDate}', '${time}', '${testId}')`;

  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;
