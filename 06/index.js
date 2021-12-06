const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split(',').map(el => parseInt(el));


const Iterations = 256;

let task1 = data => { // naive solution
    let fish = data.map(el => el);

    for (let i = 0; i < Iterations; i++) {
        let newFish = [];
        for (let f = 0; f < fish.length; f++) {
            if (fish[f]-- === 0) {
                fish[f] = 6;
                newFish.push(8);
            }
        }
        fish = fish.concat(...newFish);
    }
    return fish.length;

}
//console.log(task1(data));

let task2 = fish => { // counting number of fish each day
    const timeToCreate = 7;
    let days = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let f = 0; f < fish.length; f++) {
        days[fish[f]]++;
    }

    for (let i = 0; i < Iterations; i++) {
        let today = i % days.length;

        // create new fish
        days[(today + timeToCreate) % days.length] += days[today];
    }

    return days.reduce((a, b) => a + b, 0)
}
console.log(task2(data));

module.exports = {
    task1, task2
}
