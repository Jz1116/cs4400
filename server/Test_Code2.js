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
const end_date = '2020-09-07';
const test_status = 'positive';
const lab_tech_username = 'ygao10';

let sql = `CALL tests_processed(${start_date}, ${end_date}, ${test_status}, ${lab_tech_username})`;

let sql_result = 'select * from tests_processed_result';

connection.query(sql_result, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
  });

connection.end();