// process pool
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { pool_id, pool_status, process_date, processed_by} = form;

 const sql = `CALL process_pool('${pool_id}', '${pool_status}', '${process_date}', '${processed_by}')`;
    
  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;