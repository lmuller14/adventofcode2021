const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split(',').map(el => parseInt(el));

let matrix = new Array(data.length).fill(0);

for (let i = 0; i < data.length; i++) {
    matrix[i] = new Array(data.length).fill(0);
}

//console.log(`${data.join(', ')}`)

let printMatrix = matrix => {
    console.log(`    ${data.join(', ')}`)

    for (let i = 0; i < matrix.length; i++) {
        console.log(`${data[i]}: ${matrix[i].join(', ')}`)
    }
}

rowSums = matrix => {
    return matrix.map(row => {
        return row.reduce((a, b) => {
            return a + b;
        });
    });
}

let task1 = data => {


    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            matrix[j][i] = Math.abs(data[i] - data[j]); // task1
        }
    }

    //printMatrix(matrix);

    let minIndex = -1;

    let min = Number.MAX_VALUE;
    let newMin = Number.MAX_VALUE;

    for (let i = 0; i < matrix.length; i++) {
        newMin = matrix[i].reduce((a, b) => {
            return a + b;
        });
        if (newMin < min) {
            min = newMin;
            minIndex = i;
        }
    }

    //console.log(min, minIndex, data[minIndex])
    return min;


}
console.log(task1(data));

let task2 = data => {

    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);

    let min = Number.MAX_VALUE;
    for (let i = minVal; i <= maxVal; i++) {
        let newMin = 0;
        for (let j = 0; j < data.length; j++) {
            let n = Math.abs(data[j] - i);
            newMin += (n * ( n + 1)) / 2;
        }
        if (newMin < min) {
            min = newMin;
        }
    }

    return min;

}
console.log(task2(data));

module.exports = {
    task1, task2
}
