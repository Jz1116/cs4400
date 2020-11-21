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
const begin_appt_date = 'NULL';
const end_appt_date = 'NULL';
const begin_appt_time = 'NULL';
const end_appt_time = 'NULL';
const is_available = 'NULL';

let sql = `CALL view_appointments(${site_name}, ${begin_appt_date}, ${end_appt_date}, ${begin_appt_time}, ${end_appt_time}, ${is_available})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

let sql_result = 'select * from view_appointments_result';

connection.query(sql_result, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();