const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.post("/create", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { poolId, selectedTests } = form;

  const createPool = `CALL create_pool('${poolId}', '${selectedTests[0]}')`;

  db.query(createPool, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const size = selectedTests.length;
  for (let i = 1; i < size; i += 1) {
    const assignToPool = `CALL assign_test_to_pool('${poolId}', '${selectedTests[i]}')`;

    db.query(assignToPool, true, (error) => {
      if (error) {
        console.error(error.message);
      }
    });
  }

  res.status(200).json({ success: true });
});

router.post("/result", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { startDate, endDate, status, processedBy } = form;

  const str1 = "'";

  if (startDate !== null) {
    startDate = str1.concat(startDate);
    startDate = startDate.concat(str1);
  }

  if (endDate !== null) {
    endDate = str1.concat(endDate);
    endDate = endDate.concat(str1);
  }

  if (status !== null) {
    status = str1.concat(status);
    status = status.concat(str1);
  }

  if (processedBy !== null) {
    processedBy = str1.concat(processedBy);
    processedBy = processedBy.concat(str1);
  }

  const viewPool = `CALL view_pools(${startDate}, ${endDate}, ${status}, ${processedBy})`;

  db.query(viewPool, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from view_pools_result";

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
      return new Date(a.date_processed) - new Date(b.date_processed);
    });

    const pools = result.map((row) => {
      const formalDate = moment.utc(row.date_processed).format("M/D/YY");

      return {
        poolId: row.pool_id,
        testIds: row.test_ids,
        dateProcessed: formalDate === "Invalid date" ? null : formalDate,
        processedBy: row.processed_by,
        poolStatus: row.pool_status,
      };
    });

    res.status(200).json(pools);
  });
});

module.exports = router;
