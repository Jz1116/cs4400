// register_employee
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {
  /**const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { siteName, date, time } = form;*/

const username = '"dveverse"';
const email = '"erfetz3@gatech.edu"';
const fname = '"erggwerg"';
const lname = '"ergsfr"';
const phone = '"900000000"';
const labtech = 'True';
const site_tester = 'True';
const hashedpassword = '"l@urEni$myLIFE2@"';


  const sql = `CALL register_employee(${username}, ${email}, ${fname}, ${lname}, ${phone}, ${labtech}, ${site_tester}, ${hashedpassword})`;

  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;