//view appointment
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/done", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let {site_name, begin_appt_date,end_appt_date, begin_appt_time, end_appt_time, is_available } = form;

 
  const str1 = "'";

  if (site_name !== null) {
    site_name = str1.concat(site_name);
    site_name = site_name.concat(str1);
  }

  if (begin_appt_date !== null) {
    begin_appt_date = str1.concat(begin_appt_date);
    begin_appt_date = begin_appt_date.concat(str1);
  }
  if (end_appt_date !== null) {
    end_appt_date = str1.concat(end_appt_date);
    end_appt_date = end_appt_date.concat(str1);
  }
  if (begin_appt_time !== null) {
    begin_appt_time = str1.concat(begin_appt_time);
    begin_appt_time = begin_appt_time.concat(str1);
  }
  if (end_appt_time !== null) {
    end_appt_time = str1.concat(end_appt_time);
    end_appt_time = end_appt_time.concat(str1);
  }
  if (is_available !== null) {
    is_available = str1.concat(is_available);
    is_available = is_available.concat(str1);
  }

  const test_sign_up = `CALL view_appointments(${site_name}, ${begin_appt_date}, ${end_appt_date}, ${begin_appt_time}, ${end_appt_time}, ${is_available})`;

  db.query(test_sign_up, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from view_appointments_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
        return new Date(a.appt_date) - new Date(b.appt_date);
      });
  
      const sign_up_filter = result.map((row) => {
        const formalDate = moment.utc(row.appt_date).format("M/D/YY");

      return {
          appt_date : formalDate,
          appt_time : row.appt_time,
          site_name : row.site_name,
          location : row.location,
          username : row.username,
        };
    });

    res.status(200).json(sign_up_filter);
  });
});

module.exports = router;