const express = require("express");

const router = express.Router();
const result = require("./result");
const tester = require("./tester");
const site = require("./site");
const appt = require("./appt");
const test = require("./test");
const pool = require("./pool");
const student = require("./student");

/* GET home page. */
/** 
router.get("/", function (req, res, next) {
  res.send("this is an API route");
});
*/

router.use("/result", result);
router.use("/tester", tester);
router.use("/site", site);
router.use("/appt", appt);
router.use("/test", test);
router.use("/pool", pool);
router.use("/student", student);
module.exports = router;
