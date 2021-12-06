const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input_test.txt")).toString().split('\n');

let task1 = data => {


}
console.log(task1(data));

let task2 = data => {


}
//console.log(task2(data));

module.exports = {
    task1, task2
}
