const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split('\n')
    .map(numStr => numStr.split('')
        .map(str => parseInt(str))
    );

let task1 = data => {

    let riskCounter = 0;
    let basins = [];

    // rovnou na prasaka
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {

            let partialCounter = 0;
            let edgeCase = 0;
            try {
                if (data[i - 1][j] > data[i][j]) {
                    partialCounter++
                }
            } catch (err) {
                edgeCase++;
            }

            try {
                if (data[i + 1][j] > data[i][j]) {
                    partialCounter++
                }
            } catch (err) {
                edgeCase++;
            }


            if (data[i][j - 1] === undefined) {
                edgeCase++;
            } else if (data[i][j - 1] > data[i][j]) {
                partialCounter++
            }


            if (data[i][j + 1] === undefined) {
                edgeCase++;
            } else if (data[i][j + 1] > data[i][j]) {
                partialCounter++
            }

            if (partialCounter + edgeCase === 4) {
                basins.push({i: i, j: j, val: data[i][j]});
                riskCounter += (data[i][j] + 1);
            }

        }
    }

    //return riskCounter; task 1
    return basins;

}
//console.log(task1(data));

let printMatrix = matrix => {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(', '))
    }
}

matrixSum = matrix => {
    return matrix.map(row => {
        return row.reduce((a, b) => a + b, 0);
    }).reduce((a, b) => a + b, 0);
}

const ROW = data.length;
const COL = data[0].length;

// Direction vectors
const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

// Function to check if a cell
// is be visited or not
// https://www.geeksforgeeks.org/breadth-first-traversal-bfs-on-a-2d-array/
let isValid = (vis, row, col) => {
    // If cell lies out of bounds
    if (row < 0 || col < 0
        || row >= ROW || col >= COL)
        return false;

    // If cell is already visited
    if (vis[row][col])
        return false;

    // Otherwise
    return true;
}

// Function to perform the BFS traversal
// https://www.geeksforgeeks.org/breadth-first-traversal-bfs-on-a-2d-array/
let BFS = (grid, vis, row, col) => {
    // Stores indices of the matrix cells
    let q = [];

    // Mark the starting cell as visited
    // and push it into the queue
    q.push([row, col]);
    vis[row][col] = 1;

    // Iterate while the queue
    // is not empty
    while (q.length !== 0) {
        let cell = q[0];
        let x = cell[0];
        let y = cell[1];

        q.shift();

        // Go to the adjacent cells
        for (let i = 0; i < 4; i++) {
            let adjX = x + dRow[i];
            let adjY = y + dCol[i];

            if (isValid(vis, adjX, adjY) && data[x][y] < data[adjX][adjY] && data[adjX][adjY] < 9) {
                q.push([adjX, adjY]);
                vis[adjX][adjY] = 1;
            }
        }
    }
}


let task2 = data => {

    const basins = task1(data);
    let basinSizes = [];
    for (let b = 0; b < basins.length; b++) {
        let vis = Array.from(Array(ROW), () => Array(COL).fill(0));
        BFS(data, vis, basins[b].i, basins[b].j);
        basinSizes.push(matrixSum(vis));
    }

    basinSizes.sort((a, b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];
}
console.log(task2(data));

module.exports = {
    task1, task2
}
