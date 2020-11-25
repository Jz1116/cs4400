// register_student
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {
   

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, email, fname, lname, location, housing_type, hashedpassword } = form;

  const sql = `CALL register_student(${username}, ${email}, ${fname}, ${lname}, ${location}, ${housing_type}, ${hashedpassword})`;
    
  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;