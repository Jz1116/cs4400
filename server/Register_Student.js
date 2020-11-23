var md5 = require("md5");

let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const username = '"zwang912"';
const email = '"ericwzr@gatech.edu"';
const fname = '"Zirui"';
const lname = '"Wang"';
const location = '"East"';
const housing_type = '"Off-campus Apartment"';
const hashedpassword = '"iLoVE4400@"';

let sql = `CALL register_student(${username}, ${email}, ${fname}, ${lname}, ${location}, ${housing_type}, ${hashedpassword})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();