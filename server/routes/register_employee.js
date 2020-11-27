// register_employee
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, email, fname, lname, phone, labtech, site_tester, hashedpassword } = form;

  const sql = `CALL register_employee('${username}', '${email}', '${fname}', '${lname}', '${phone}', '${labtech}', '${site_tester}', '${hashedpassword}')`;

  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;