let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const location = '"NULL"';
const housing = 'NULL';
const testing_site = 'NULL';
const start_date = 'NULL';
const end_date = 'NULL';

let sql = `CALL aggregate_results(${location}, ${housing}, ${testing_site}, ${start_date}, ${end_date})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

let sql_result = 'select * from aggregate_results_result';

connection.query(sql_result, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();

