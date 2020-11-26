// pool_metadata
// view_pool
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/data", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { pool_id } = form;
  
  const pool_metadata_result = `CALL pool_metadata('${pool_id}')`;

  db.query(pool_metadata_result, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from pool_metadata_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
        return new Date(a.date_processed) - new Date(b.date_processed);
    });
  
      const pool_metadata = result.map((row) => {
        const formalDate = moment.utc(row.date_processed).format("M/D/YY");

      return {
          pool_id : row.pool_id,
          date_processed : formalDate,
          pooled_result : row.pooled_result,
          processed_by : row.processed_by,
        };
    });

    res.status(200).json(pool_metadata);
  });
});

module.exports = router;