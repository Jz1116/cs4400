const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/all/pending", (req, res) => {
  const getPendingPools = `select pool_id from pool where pool_status = 'pending'`;

  db.query(getPendingPools, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
    const poolIds = [];
    result.forEach((row) => {
      poolIds.push(row.pool_id);
    });
    res.status(200).json(poolIds);
  });
});

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

router.get("/data/:poolId", (req, res) => {
  const { poolId } = req.params;

  const poolMetadataResult = `CALL pool_metadata('${poolId}')`;

  db.query(poolMetadataResult, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = "select * from pool_metadata_result";

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const poolMetadata = result.map((row) => {
      const formalDate = moment.utc(row.date_processed).format("M/D/YY");

      return {
        poolId: row.pool_id,
        dateProcessed: formalDate,
        pooledResult: row.pooled_result,
        processedBy: row.processed_by,
      };
    });

    res.status(200).json(poolMetadata);
  });
});

router.get("/tests/:poolId", (req, res) => {
  const { poolId } = req.params;

  const testsInPoolResult = `CALL tests_in_pool('${poolId}')`;
  db.query(testsInPoolResult, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayTests = "select * from tests_in_pool_result";
  db.query(displayTests, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
      return new Date(a.date_tested) - new Date(b.date_tested);
    });

    const testsInPool = result.map((row) => {
      const formalDate = moment.utc(row.date_tested).format("M/D/YY");

      return {
        testId: row.test_id,
        dateTested: formalDate,
        siteName: row.testing_site,
        testResult: row.test_result,
      };
    });

    res.status(200).json(testsInPool);
  });
});

router.post("/process", (req, res) => {
  const { encodedPoolForm } = req.body;
  const form = JSON.parse(encodedPoolForm);
  const { poolId, poolStatus, processDate, processedBy } = form;

  const processPool = `CALL process_pool('${poolId}', '${poolStatus}', '${processDate}', '${processedBy}')`;

  db.query(processPool, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;
