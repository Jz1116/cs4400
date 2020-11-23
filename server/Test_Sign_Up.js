let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const username = '"pbuffay56"';
const site_name = '"Bobby Dodd Stadium"';
const appt_date = '"2020-09-16"';
const appt_time = '"12:00:00"';
const test_id = '"12345"';

let sql = `CALL test_sign_up(${username}, ${site_name}, ${appt_date}, ${appt_time}, ${test_id})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();