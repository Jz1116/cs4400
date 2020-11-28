const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.get("/view", (req, res) => {
  const viewTesters = `CALL view_testers()`;

  db.query(viewTesters, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displayTesters = "select * from view_testers_result";

  db.query(displayTesters, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const testers = result.map((row) => {
      return {
        username: row.username,
        name: row.name,
        phoneNum: row.phone_number,
        assignedSites:
          row.assigned_sites === null ? [] : row.assigned_sites.split(","),
      };
    });

    res.status(200).json(testers);
  });
});

router.get("/all", (req, res) => {
  const getAllTesters =
    "select concat(fname, ' ', lname) as full_name, username from sitetester join user on sitetester_username = username";

  db.query(getAllTesters, true, (error, result) => {
    if (error) {
      console.log(error);
    }

    const names = result.map((row) => {
      return [row.full_name, row.username];
    });

    res.status(200).json(names);
  });
});

router.post("/unassign", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, siteName } = form;

  const unassignTester = `CALL unassign_tester('${username}', '${siteName}')`;

  db.query(unassignTester, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

router.post("/assign", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { username, siteName } = form;

  const assignTester = `CALL assign_tester('${username}', '${siteName}')`;

  db.query(assignTester, true, (error) => {
    if (error) {
      console.error(error.message);
    }
    res.status(200).json({ success: true });
  });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  const getFullName = `select concat(fname, ' ', lname) as full_name from sitetester join user on sitetester_username = username where sitetester_username = '${username}'`;

  db.query(getFullName, true, (error, result) => {
    if (error) {
      console.log(error);
    }

    res.status(200).json(result[0]);
  });
});

router.get("/:username/sites", (req, res) => {
  const { username } = req.params;

  const getAssignedSites = `CALL tester_assigned_sites('${username}')`;
  db.query(getAssignedSites, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const displaySites = "select * from tester_assigned_sites_result";
  db.query(displaySites, true, (error, result) => {
    if (error) {
      console.error(error.message);
    }

    const assignedSites = [];
    result.forEach((row) => {
      assignedSites.push(row.site_name);
    });

    res.status(200).json(assignedSites);
  });
});

module.exports = router;
