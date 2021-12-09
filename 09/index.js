const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split('\n')
    .map(numStr => numStr.split('')
        .map(str => parseInt(str))
    );

let task1 = data => {

    let riskCounter = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {

            let partialCounter = 0;
            let egeCase = 0;
            try {
                if (data[i - 1][j] > data[i][j]) {
                    partialCounter++
                }
            } catch (err) {
                egeCase++;
            }

            try {
                if (data[i + 1][j] > data[i][j]) {
                    partialCounter++
                }
            } catch (err) {
                egeCase++;
            }


            if (data[i][j - 1] === undefined) {
                egeCase++;
            } else if (data[i][j - 1] > data[i][j]) {
                partialCounter++
            }


            if (data[i][j + 1] === undefined) {
                egeCase++;
            } else if (data[i][j + 1] > data[i][j]) {
                partialCounter++
            }

            if (partialCounter + egeCase === 4) {
                riskCounter += (data[i][j] + 1);
            }

        }
    }

    return riskCounter;

}
console.log(task1(data));

let task2 = data => {


}
//console.log(task2(data));

module.exports = {
    task1, task2
}
