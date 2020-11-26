// test_sign_up
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {
/**
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { pool_id, test_id } = form;
  */

 const username = '"pbuffay56"';
 const site_name = '"Bobby Dodd Stadium"';
 const appt_date = '"2020-09-16"';
 const appt_time = '"12:00:00"';
 const test_id = '"12345"';

  const sql = `CALL test_sign_up(${username}, ${site_name}, ${appt_date}, ${appt_time}, ${test_id})`;
    
  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;