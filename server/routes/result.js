const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/daily", (req, res) => {
  const getDailyResult = `CALL daily_results()`;

  db.query(getDailyResult, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from daily_results_result";
  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
    result.sort((a, b) => {
      return new Date(a.process_date) - new Date(b.process_date);
    });

    const dailyResult = result.map((row) => {
      const formalDate = moment.utc(row.process_date).format("M/D/YY");

      return {
        process_date: formalDate,
        num_tests: row.num_tests,
        pos_tests: row.pos_tests,
        pos_percent: `${row.pos_percent}%`,
      };
    });

    res.status(200).json(dailyResult);
  });
});

router.post("/aggregate", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { location, housing, site, startDate, endDate } = form;
  const str1 = "'";

  // handle edge cases
  if (location !== null) {
    location = str1.concat(location);
    location = location.concat(str1);
  }

  if (housing !== null) {
    housing = str1.concat(housing);
    housing = housing.concat(str1);
  }

  if (site !== null) {
    site = str1.concat(site);
    site = site.concat(str1);
  }

  if (startDate !== null) {
    startDate = str1.concat(startDate);
    startDate = startDate.concat(str1);
  }

  if (endDate !== null) {
    endDate = str1.concat(endDate);
    endDate = endDate.concat(str1);
  }

  const getAggregateResult = `CALL aggregate_results(${location}, ${housing}, ${site}, ${startDate}, ${endDate})`;

  db.query(getAggregateResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from aggregate_results_result";

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const aggregateResult = result.map((row) => {
      return {
        test_status: row.test_status,
        num_of_test: row.num_of_test,
        percentage: `${row.percentage}%`,
      };
    });

    res.status(200).json(aggregateResult);
  });
});

module.exports = router;
