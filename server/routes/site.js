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

router.get("/all", (req, res) => {
  const getAllSites = `SELECT site_name from site`;

  db.query(getAllSites, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const sites = [];
    result.forEach((site) => {
      if (site.site_name.length !== 0) {
        sites.push(site.site_name);
      }
    });

    res.status(200).json(sites);
  });
});

module.exports = router;
