let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const pool_id = '88';
const pool_status = '"positive"';
const process_date = '"2020-12-14"';
const processed_by = '"jhilborn98"';

let sql = `CALL process_pool(${pool_id}, ${pool_status}, ${process_date}, ${processed_by})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();