let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const site_name = '"Bobby Dodd Stadium"';
const date = '"2020-11-14"';
const time = '"12:00:00"';

let sql = `CALL create_appointment(${site_name}, ${date}, ${time})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });
    
connection.end();