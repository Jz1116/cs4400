let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const start_date = 'NULL';
const end_date = 'NULL';
const test_status = 'NULL';
const lab_tech_username = 'NULL';

let sql = `CALL tests_processed(${start_date}, ${end_date}, ${test_status}, ${lab_tech_username})`;

let sql_result = 'select * from covidtest_fall2020.tests_processed_result';

connection.query(sql_result, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();


