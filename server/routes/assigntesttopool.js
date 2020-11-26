// assign test to pool
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { pool_id, test_id } = form;

  const sql = `CALL assign_test_to_pool(${pool_id}, ${test_id})`;
    
  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;