const input = require("./input");
const colors = require("colors");

const memoryGame = (input, j) => {
    const dict = input.reduce((acc, cur, index) => {
        acc[cur] = [index + 1];
        return acc;
    }, {});

    let lastNumberSpoken = null;
    for (let i = input.length + 1; i <= j; i++) {
        if (lastNumberSpoken === null || dict[lastNumberSpoken].length <= 1) {
            lastNumberSpoken = 0;
            if (!dict[lastNumberSpoken]) {
                dict[lastNumberSpoken] = [];
            }
            dict[lastNumberSpoken].push(i);
        } else {
            lastNumberSpoken = dict[lastNumberSpoken][dict[lastNumberSpoken].length - 1] - dict[lastNumberSpoken][dict[lastNumberSpoken].length - 2];
            if (!dict[lastNumberSpoken]) {
                dict[lastNumberSpoken] = [];
            }
            dict[lastNumberSpoken].push(i);
        }
    }
    return lastNumberSpoken;
};

const input = [1, 0, 15, 2, 10, 13];

console.log("--- Day 15: Rambunctious Recitation ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + memoryGame(input, 2020).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + memoryGame(input, 30000000).toString().cyan + "\n");
