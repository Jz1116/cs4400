let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const site_name = '"Test Site 1"';
const street = '"test st"';
const city = '"Atlanta"';
const state = '"GA"';
const zip = '"30318"';
const location = '"East"';
const tester_username = '"akarev16"';

let sql = `CALL create_testing_site(${site_name}, ${street}, ${city}, ${state}, ${zip}, ${location}, ${tester_username})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });
    
connection.end();