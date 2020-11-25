// aggregate_result
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/result", (req, res) => {
  
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { location, housing, testing_site, start_date, end_date } = form;

  const str1 = "'";

  if (location === "NULL") {
    location = null;
  } else {
    location = str1.concat(location);
    location = location.concat(str1);
  }

  if (housing === "NULL") {
    housing = null;
  } else {
    housing = str1.concat(housing);
    housing = housing.concat(str1);
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

  const getAggregateResult = `CALL aggregate_results(${location}, ${housing}, ${testing_site}, ${start_date}, ${end_date})`;

  db.query(getAggregateResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from aggregate_results_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const aggregateResult = result.map((row) => {

      return {
        test_status: row.test_status,
        num_of_test: row.num_of_test,
        percentage: `${row.percentage}%`,      };
    });

    res.status(200).json(aggregateResult);
  });
});

module.exports = router;
