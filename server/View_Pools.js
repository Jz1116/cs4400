let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const begin_process_date = '"1900-10-10"';
const end_process_date = '"2020-12-12"';
const pool_status = 'NULL';
const processed_by = 'NULL';

let sql = `CALL view_pools(${begin_process_date}, ${end_process_date}, ${pool_status}, ${processed_by})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

let sql_result = 'select * from view_pools_result';

connection.query(sql_result, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();