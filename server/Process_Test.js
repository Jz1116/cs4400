let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const test_id = '100089';
const test_status = '"positive"';

let sql = `CALL process_test(${test_id}, ${test_status})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });
    
connection.end();