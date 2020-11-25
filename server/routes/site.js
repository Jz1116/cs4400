const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/create", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const {
    siteName,
    address,
    city,
    usaState,
    zipCode,
    location,
    siteTester,
  } = form;

  const sql = `CALL create_testing_site('${siteName}', '${address}', '${city}', '${usaState}', '${zipCode}', '${location}', '${siteTester}')`;

  db.query(sql, true, (error, results) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;
