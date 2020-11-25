let test_status = "positive";
const str1 = "'"
test_status = str1.concat(test_status);
test_status = test_status.concat(str1);
console.log(test_status);