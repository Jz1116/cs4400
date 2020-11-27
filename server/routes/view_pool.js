// view_pool
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/result", (req, res) => {
 
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let {begin_process_date, end_process_date, pool_status, processed_by } = form;

  const str1 = "'";

  if (begin_process_date === "NULL") {
    begin_process_date = null;
  } else {
    begin_process_date = str1.concat(begin_process_date);
    begin_process_date = begin_process_date.concat(str1);
  }

  if (end_process_date === "NULL") {
    end_process_date = null; 
  } else {
    end_process_date = str1.concat(end_process_date);
    end_process_date = end_process_date.concat(str1);
  }

  if (pool_status === "NULL") {
    pool_status = null; 
  } else {
    pool_status = str1.concat(pool_status);
    pool_status = pool_status.concat(str1);
  }

  if (processed_by === "NULL") {
    processed_by = null; 
  } else {
    processed_by = str1.concat(processed_by);
    processed_by = processed_by.concat(str1);
  }

  const view_pool_result = `CALL view_pools(${begin_process_date}, ${end_process_date}, ${pool_status}, ${processed_by})`;

  db.query(view_pool_result, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from view_pools_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    result.sort((a, b) => {
        return new Date(a.date_processed) - new Date(b.date_processed);
    });
  
      const view_pool = result.map((row) => {
        const formalDate = moment.utc(row.date_processed).format("M/D/YY");

      return {
          pool_id : row.pool_id,
          test_ids : row.test_ids,
          date_processed : formalDate,
          processed_by : row.processed_by,
          pool_status: row.pool_status,
        };
    });

    res.status(200).json(view_pool);
  });
});

module.exports = router;