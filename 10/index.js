const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "input.txt")).toString().split('\n');


let checkParenthesis = s => {
    let i = 0;
    let stack = [];
    while (i < s.length) {
        if (s[i] === '{' || s[i] === '(' || s[i] === '[' || s[i] === '<') {
            stack.push(s[i]);
        } else if (s[i] === '}' && stack[stack.length - 1] === '{') {
            stack.pop();
        } else if (s[i] === ')' && stack[stack.length - 1] === '(') {
            stack.pop();
        } else if (s[i] === ']' && stack[stack.length - 1] === '[') {
            stack.pop();
        } else if (s[i] === '>' && stack[stack.length - 1] === '<') {
            stack.pop();
        } else {
            return {corrupted: s[i]};
        }
        i++
    }
    return {stack: stack};
};

let task1 = data => {

    let score1 = [];
    score1[3] = ')';
    score1[57] = ']';
    score1[1197] = '}';
    score1[25137] = '>';

    let score2 = ['', '(', '[', '{', '<'];

    let totalScoreTask1 = 0;
    let totalScoreTask2 = [];
    
    for (let i = 0; i < data.length; i++) {
        let res = checkParenthesis(data[i])
        if (res.corrupted) {
            totalScoreTask1 += score1.indexOf(res.corrupted);
        } else {
            let rowScore = 0;
            for (let c = res.stack.length-1; c >= 0 ; c--) {
                rowScore = (5 * rowScore) + score2.indexOf(res.stack[c]);
            }
            totalScoreTask2.push(rowScore)
        }
    }

    totalScoreTask2.sort((a, b) => a - b)
    return [totalScoreTask1, totalScoreTask2[Math.floor(totalScoreTask2.length / 2)]];

}
console.log(task1(data));

let task2 = data => {


}
//console.log(task2(data));

module.exports = {
    task1, task2
}
