const express = require("express");
const db = require("../mysqldb");

const router = express.Router();

router.post("/create", (req, res) => {
  const { encodedForm } = req.body;
  const form = JSON.parse(encodedForm);
  const { poolId, selectedTests } = form;

  const createPool = `CALL create_pool('${poolId}', '${selectedTests[0]}')`;

  db.query(createPool, true, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  const size = selectedTests.length;
  for (let i = 1; i < size; i += 1) {
    const assignToPool = `CALL assign_test_to_pool('${poolId}', '${selectedTests[i]}')`;

    db.query(assignToPool, true, (error) => {
      if (error) {
        console.error(error.message);
      }
    });
  }

  res.status(200).json({ success: true });
});

module.exports = router;
