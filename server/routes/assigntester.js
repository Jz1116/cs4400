// assign_tester
const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/done", (req, res) => {

  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { tester_username, site_name } = form;

  const sql = `CALL assign_tester('${tester_username}', '${site_name}')`;
    
  db.query(sql, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;