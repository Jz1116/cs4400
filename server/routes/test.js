const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/all", (req, res) => {
  const getAllTests = `SELECT test_id, appt_date FROM TEST where pool_id is null`;

  db.query(getAllTests, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }

    const tests = result.map((row) => {
      return {
        testId: row.test_id,
        date: moment.utc(row.appt_date).format("M/D/YY"),
        checked: false,
      };
    });

    res.status(200).json(tests);
  });
});

router.get("/:poolId", (req, res) => {
  const { poolId } = req.params;

  const testsInPoolResult = `CALL tests_in_pool('${poolId}')`;
  db.query(testsInPoolResult, true, (error) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
  });

  const displayTests = "select * from tests_in_pool_result";
  db.query(displayTests, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }

    result.sort((a, b) => {
      return new Date(a.date_tested) - new Date(b.date_tested);
    });

    const testsInPool = result.map((row) => {
      const formalDate = moment.utc(row.date_tested).format("M/D/YY");

      return {
        testId: row.test_id,
        dateTested: formalDate,
        testResult: row.test_result,
      };
    });

    res.status(200).json(testsInPool);
  });
});

router.post("/process", (req, res) => {
  const { encodedTestForm } = req.body;
  const form = JSON.parse(encodedTestForm);
  const { testId, testStatus } = form;

  const processTest = `CALL process_test('${testId}', '${testStatus}')`;

  db.query(processTest, true, (error) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;
