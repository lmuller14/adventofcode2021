const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input_test.txt")).toString().split('\n')
    .map(row => row.split(' | '));

//data[0] input
//data[1] output

let task1 = data => {

    let counter = 0;
    for (let i = 0; i < data.length; i++) {
        let output = data[i][1].split(' ');
        counter += output.filter(d => {
            let len = d.length;
            return len === 2 || len === 3 || len === 4 || len === 7;
        }).length;
    }

    return counter;

}
//console.log(task1(data));

let task2 = data => {

    let segments = new Array(7).fill('');
    console.log(segments);


    let counter = 0;
    for (let i = 0; i < data.length; i++) {
        let signals = [...data[i][1].split(' ')];
        //console.log(signals.join(' '))
        // find the pattern

        // 1
        //console.log(Array.from(new Set(signals.filter(d => d.length === 2))))

        // 4
        //console.log(Array.from(new Set(signals.filter(d => d.length === 4))))

        // 7
        console.log(Array.from(new Set(signals.filter(d => d.length === 3))))

        // 8
        //console.log(Array.from(new Set(signals.filter(d => d.length === 7))))

    }

}
console.log(task2(data));

module.exports = {
    task1, task2
}
