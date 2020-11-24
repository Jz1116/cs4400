const express = require("express");
const result = require("./result");

const router = express.Router();

/* GET home page. */
/** 
router.get("/", function (req, res, next) {
  res.send("this is an API route");
});
*/

router.use("/result", result);

module.exports = router;
