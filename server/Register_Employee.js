let mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

const username = '"sstentz3"';
const email = '"sstentz3@gatech.edu"';
const fname = '"Samuel"';
const lname = '"Stentz"';
const phone = '"9703312824"';
const labtech = 'True';
const site_tester = 'True';
const hashedpassword = '"l@urEni$myLIFE2@"';

let sql = `CALL register_employee(${username}, ${email}, ${fname}, ${lname}, ${phone}, ${labtech}, ${site_tester}, ${hashedpassword})`;

connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });

connection.end();