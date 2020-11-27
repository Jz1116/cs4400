// process test
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { test_id, test_status} = form;

 const sql = `CALL process_test('${test_id}', '${test_status}')`;

  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;