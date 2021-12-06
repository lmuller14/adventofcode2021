const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split('\n');

const fwd = 'forward';
const up = 'up';
const down = 'down';

let dive1 = commands => {
    let horizontal = 0;
    let depth = 0;
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i].split(' ');
        switch (command[0]) {
            case fwd:
                horizontal += parseInt(command[1]);
                break;
            case down:
                depth += parseInt(command[1]);
                break;
            case up:
                depth -= parseInt(command[1]);
                break;
        }
    }
    return horizontal * depth;
}
console.log(dive1(data));

let dive2 = commands => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i].split(' ');
        let val = parseInt(command[1]);
        switch (command[0]) {
            case fwd: {
                horizontal += val;
                depth += aim > 0 ? (aim * val) : 0;
            }
                break;
            case down:
                aim += val;
                break;
            case up:
                aim -= val;
                break;
        }
    }
    return horizontal * depth;
}

console.log(dive2(data));

module.exports = {
    dive1, dive2
}
