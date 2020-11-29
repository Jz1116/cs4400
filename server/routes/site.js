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

  db.query(sql, true, (error) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
    res.status(200).json({ success: true });
  });
});

router.get("/all", (req, res) => {
  const getAllSites = `SELECT site_name from site`;

  db.query(getAllSites, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
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

router.post("/only", async (req, res) => {
  const { site } = req.body;

  const countWorkAt = `select * from working_at where site = '${site}'`;
  db.query(countWorkAt, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
    if (result.length === 1) {
      res.status(200).json({ success: true, site });
    } else {
      res.status(200).json({ success: false, site });
    }
  });
});

router.post("/unique", (req, res) => {
  const { siteName } = req.body;

  const checkUnique = `select * from site where site_name = '${siteName}'`;
  db.query(checkUnique, true, (error, result) => {
    if (error) {
      res.status(500).send("An unexpected error occurred");
    }
    if (result.length === 0) {
      res.status(200).json({ isUnique: true });
    } else {
      res.status(200).json({ isUnique: false });
    }
  });
});

module.exports = router;
