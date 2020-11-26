// tester_assigned_sites
const express = require("express");
const moment = require("moment");
const db = require("../mysqldb");

const router = express.Router();

router.get("/result", (req, res) => {
  
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  let { tester_username } = form;

  const tester_assigned_sites_result = `CALL tester_assigned_sites('${tester_username}')`;

  db.query(tester_assigned_sites_result, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayResult = 'select * from tester_assigned_sites_result';

  db.query(displayResult, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
    const tester_assigned_site = result.map((row) => {
      return {
        site_name : row.site_name,
      };
  });

    res.status(200).json(tester_assigned_site);
  });
});
module.exports = router;