const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.post("/create", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { siteName, date, time } = form;

  const sql = `CALL create_appointment('${siteName}', '${date}', '${time}')`;

  db.query(sql, true, (error) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
    res.status(200).json({ success: true });
  });
});

router.post("/all", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { siteName, startDate, endDate, startTime, endTime, isAvailable } = form;

  const str1 = "'";

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
  if (startTime !== null) {
    startTime = str1.concat(startTime);
    startTime = startTime.concat(str1);
  }
  if (endTime !== null) {
    endTime = str1.concat(endTime);
    endTime = endTime.concat(str1);
  }
  if (isAvailable !== null) {
    isAvailable = str1.concat(isAvailable);
    isAvailable = isAvailable.concat(str1);
  }

  const getAppts = `CALL view_appointments(${siteName}, ${startDate}, ${endDate}, ${startTime}, ${endTime}, ${isAvailable})`;

  db.query(getAppts, true, (error) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
  });

  const displayAppts = "select * from view_appointments_result";

  db.query(displayAppts, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }

    result.sort((a, b) => {
      return new Date(a.appt_date) - new Date(b.appt_date);
    });

    const appts = result.map((row) => {
      const formalDate = moment.utc(row.appt_date).format("M/D/YY");

      return {
        date: formalDate,
        time: row.appt_time,
        siteName: row.site_name,
        location: row.location,
        username: row.username,
      };
    });

    res.status(200).json(appts);
  });
});

module.exports = router;
