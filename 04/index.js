const fs = require("fs");
const path = require("path");
const toDraw_test = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];

const toDraw1 = [63, 23, 2, 65, 55, 94, 38, 20, 22, 39, 5, 98, 9, 60, 80, 45, 99, 68, 12, 3, 6, 34, 64, 10, 70, 69, 95, 96, 83, 81, 32, 30, 42, 73, 52, 48, 92, 28, 37, 35, 54, 7, 50, 21, 74, 36, 91, 97, 13, 71, 86, 53, 46, 58, 76, 77, 14, 88, 78, 1, 33, 51, 89, 26, 27, 31, 82, 44, 61, 62, 75, 66, 11, 93, 49, 43, 85, 0, 87, 40, 24, 29, 15, 59, 16, 67, 19, 72, 57, 41, 8, 79, 56, 4, 18, 17, 84, 90, 47, 25];

const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString()
    .replaceAll('\n ', '\n').split('\n\n')
    .map(row => row.split('\n').map(row => row.split(' ').map(number => parseInt(number))));

const M = 5;

let findNumberInMatrix = (matrix, number) => {
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] === number) {  // number found
                return {i: i, j: j};
            }
        }
    }
    return null;
}

const rotate90 = matrix => {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}

rowSums = matrix => {
    return matrix.map(row => {
        return row.reduce((a, b) => {
            // tackle the -1
            a = a === -1 ? 0 : a;
            b = b === -1 ? 0 : b;
            return a + b;
        });
    });
}

matrixSum = matrix => {
    return rowSums(matrix).reduce((a, b) => a + b, 0);
}


let checkWinningPosition = matrix => {
    let resultRow = matrix.map(row => {
        return row.reduce((a, b) => {
            return a + b;
        });
    });

    return (resultRow.find(sum => sum === -M) === -M);
}
//console.log(checkWinningPosition(data[0]));

let task1 = data => {
    let counter = 0;
    const toDraw = toDraw1;
    for (let d = 0; d < toDraw.length; d++) { // toDraw.length
        for (let m = 0; m < data.length; m++) { //matrix iteration
            if (data[m] != null) {
                let found = findNumberInMatrix(data[m], toDraw[d]);
                if (found) { //number in matrix found
                    data[m][found.i][found.j] = -1;

                    //check winning position
                    if (checkWinningPosition(data[m]) || checkWinningPosition(rotate90(data[m]))) { //winner
                        // task 1
                        //return console.log(m, toDraw[d], matrixSum(data[m]), matrixSum(data[m]) * toDraw[d])

                        // below task 2
                        counter++;
                        console.log(data[m], counter, m, toDraw[d], matrixSum(data[m]), matrixSum(data[m]) * toDraw[d]);
                        data[m] = null;
                    }
                }
            }
        }
    }
    return -1;
}
console.log(task1(data));


module.exports = {
    task1
}
