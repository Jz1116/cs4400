let mysql = require('mysql');

let config = require('./config.js');
const { use } = require('./routes/index.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const username = 'gburdell1';
const testing_site = "North Avenue (Centenial Room)";
const start_date = 'NULL';
const end_date = '2020-10-06';
const start_time = 'NULL';
const end_time = 'NULL';

let sql = `CALL test_sign_up_filter(${username}, ${testing_site}, ${start_date}, ${end_date}, ${start_time}, ${end_time})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

let sql_result = 'select * from test_sign_up_filter_result';

connection.query(sql_result, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();