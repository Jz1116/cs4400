const start_date = 'NULL';
const end_date = '2020-09-07';
const test_status = 'positive';
const lab_tech_username = 'ygao10';

let sql = `CALL tests_processed(${start_date}, ${end_date}, ${test_status}, ${lab_tech_username})`;

console.log(sql);

