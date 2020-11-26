const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/create", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, email, fname, lname, location, housing, password } = form;

  const registerStudent = `CALL register_student('${username}', '${email}', '${fname}', '${lname}', '${location}', '${housing}', '${password}')`;

  db.query(registerStudent, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;
