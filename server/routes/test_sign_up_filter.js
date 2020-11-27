// test_sign_up filter
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/test", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { username,testing_site, start_date, end_date, start_time, end_time } = form;

  const str1 = "'";

  if (start_time === "NULL") {
    start_time = null;
  } else {
    start_time = str1.concat(start_time);
    start_time = start_time.concat(str1);
  }

  if (end_time === "NULL") {
    end_time = null;
  } else {
    end_time = str1.concat(end_time);
    end_time = end_time.concat(str1);
  }

  if (testing_site === "NULL") {
    testing_site = null; 
  } else {
    testing_site = str1.concat(testing_site);
    testing_site = testing_site.concat(str1);
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

  const test_sign_up = `CALL test_sign_up_filter(${username}, ${testing_site}, ${start_date}, ${end_date}, ${start_time}, ${end_time})`;

  db.query(test_sign_up, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from test_sign_up_filter_result';

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
        appt_date: formalDate,
        appt_time: row.appt_time,
        street: row.street,
        city:row.city,
        state: row.state,
        zip: row.zip,
        site_name: row.site_name,
        };
    });

    res.status(200).json(sign_up_filter);
  });
});

module.exports = router;