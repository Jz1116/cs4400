const express = require("express");

const router = express.Router();
const result = require("./result");
const tester = require("./tester");
const site = require("./site");
const appt = require("./appt");
const pool = require("./pool");
const student = require("./student");
const explore = require("./explore");
const aggregate = require("./aggregate");
const filter = require("./filter");
const testprocessed = require("./testprocessed");
const viewpool = require("./viewpool");
const registeremployee = require("./registeremployee");
const registerstudent = require("./registerstudent");
const testsignup = require("./testsignup");
const assigntesttopool = require("./assigntesttopool");
const processpool = require("./processpool");
const processtest = require("./processtest");
const viewappointment = require("./viewappointment");
const viewtesters = require("./viewtesters");
const poolmeta = require("./poolmeta");
const testsinpool = require("./testsinpool");
const testerassignsite = require("./testerassignsite");
const assigntester = require("./assigntester");
const unassigntester = require("./unassigntester");
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
router.use("/pool", pool);
router.use("/student", student);
router.use("/explore", explore);
router.use("/aggregate", aggregate);
router.use("/filter",filter);
router.use("/testprocessed", testprocessed);
router.use("/viewpool", viewpool);
router.use("/registeremployee", registeremployee);
router.use("/registerstudent", registerstudent);
router.use("/testsignup", testsignup);
router.use("/assigntesttopool", assigntesttopool);
router.use("/processpool", processpool);
router.use("/processtest", processtest);
router.use("/viewappointment", viewappointment);
router.use("/viewtesters", viewtesters);
router.use("/poolmeta", poolmeta);
router.use("/testsinpool", testsinpool);
router.use("/testerassignsite", testerassignsite);
router.use("/assigntester", assigntester);
router.use("/unassigntester", unassigntester);
module.exports = router;
