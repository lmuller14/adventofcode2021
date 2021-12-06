const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split('\n')
    .map(row => row.split(' -> ')
        .map(row =>
            {
                let coords = row.split(',');
                return {x:  parseInt(coords[1]), y:  parseInt(coords[0])}
            }
        )
    );

const M = 1000;

let matrix = [];
for (let i = 0; i < M; i++) {
    matrix[i] = [];
    for (let j = 0; j < M; j++) {
        matrix[i][j] = 0;
    }
}

let printMatrix = matrix => {
    for (let i = 0; i < M; i++) {
        console.log(matrix[i].join(', '))
    }
}

let checkOverlaps = matrix => {
    let counter = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] > 1) {
                counter++
            }
        }
    }
    return counter;
}

let task1 = data => {

    for (let i = 0; i < data.length; i++) { // input iteration
        if (data[i][0].y === data[i][1].y) { // vertical

            let from = data[i][0].x;
            let to = data[i][1].x;
            if (data[i][0].x > data[i][1].x) {
                from = data[i][1].x;
                to = data[i][0].x;
            }

            for (let x = from; x <= to; x++) {
                matrix[x][data[i][1].y]++;
            }
        }

        else if (data[i][0].x === data[i][1].x) { // horizontal

            let from = data[i][0].y;
            let to = data[i][1].y;
            if (data[i][0].y > data[i][1].y) {
                from = data[i][1].y;
                to = data[i][0].y;
            }

            for (let y = from; y <= to; y++) {
                matrix[data[i][0].x][y]++;
            }
        }
        else { // diagonals
            const x1 = data[i][0].x;
            const y1 = data[i][0].y;
            const x2 = data[i][1].x;
            const y2 = data[i][1].y;

            const xMin = Math.min(x1, x2);
            const xMAx = Math.max(x1, x2);

            if (x1 - x2 === y1 - y2) { // left
                for (let x = xMin, y = Math.min(y1, y2); x <= xMAx; x++, y++) {
                    matrix[x][y]++;
                }
            }
            else if (x1 - x2 === y2 - y1) { // right
                for (let x = xMin, y = Math.max(y1, y2); x <= xMAx; x++, y--) {
                    matrix[x][y]++;
                }
            }
        }
    }
    //printMatrix(matrix);
    return checkOverlaps(matrix);

}
console.log(task1(data));

let task2 = data => {

}
//console.log(task2(data));

module.exports = {
    task1, task2
}
