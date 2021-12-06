const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split('\n');

let task1 = data => {

    let bitArray = data.map(numStr => {
        return numStr.split('').map(str => parseInt(str))
    });

    let results = bitArray[0].map(bits => ({zeros: 0, ones: 0}));

    for (let i = 0; i < bitArray.length; i++) {
        let bits = bitArray[i];
        for (let j = 0; j < bits.length; j++) {
            bits[j] ? results[j].ones++ : results[j].zeros++
        }
    }


    const gama = parseInt(results.map(res => {
        return res.zeros > res.ones ? 0 : 1
    }).join(''), 2);

    const epsilon = parseInt(results.map(res => {
        return res.zeros < res.ones ? 0 : 1
    }).join(''), 2);

    console.log(gama, epsilon)

    return gama * epsilon;

}
//console.log(task1(data));

let task2 = data => {
    const bitSize = 12;

    let bitArray = data.map(numStr => {
        return numStr.split('').map(str => parseInt(str))
    });

    for (let b = 0; b < bitSize; b++) {
        let results = bitArray[0].map(bits => ({zeros: 0, ones: 0, pos1: [], pos0: []}));

        for (let i = 0; i < bitArray.length; i++) {
            let bits = bitArray[i];
            for (let j = 0; j < bits.length; j++) {
                if (bits[j]) {
                    results[j].ones++;
                    results[j].pos1.push(i);
                } else {
                    results[j].zeros++;
                    results[j].pos0.push(i);
                }
            }
        }

        //filter rows with 1 >=
        if (results[b].ones < results[b].zeros) {
            for (let i = 0; i < results[b].pos0.length; i++) {
                bitArray[results[b].pos0[i]] = null;
            }
        } else {
            for (let i = 0; i < results[b].pos1.length; i++) {
                bitArray[results[b].pos1[i]] = null;
            }
        }
        bitArray = bitArray.filter(el => el != null);

        if (bitArray.length === 1) {
            return parseInt(bitArray[0].join(''), 2);
        }

    } //b

}

console.log(task2(data)); // 841 * 3384
console.log(841 * 3384);

module.exports = {
    task1, task2
}
