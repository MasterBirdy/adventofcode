const input = require("./input");
const colors = require("colors");

const jolt = (input) => {
    input.sort((a, b) => parseInt(a) - parseInt(b)).unshift("0");
    const dict = { 3: 1 };
    for (let i = 1; i < input.length; i++) {
        const difference = parseInt(input[i]) - parseInt(input[i - 1]);
        dict[difference] = dict[difference] + 1 || 1;
    }

    return dict["1"] * dict["3"];
};

const joltAgain = (input) => {
    const sorted = input.map((item) => parseInt(item)).sort((a, b) => a - b);

    const memo = {};
    return helperFunction(0);
    function helperFunction(position) {
        if (memo[position]) return memo[position];
        if (position === sorted.length - 1) return 1;
        if (position >= sorted.length) return 0;
        let answer = 0;
        for (let i = 1; i < 4; i++) {
            if (position + i < sorted.length && sorted[position + i] <= sorted[position] + 3) {
                answer += helperFunction(position + i);
            }
        }
        memo[position] = answer;
        return memo[position];
    }
};

console.log("--- Day 10: Adapter Array ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + jolt(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + joltAgain(input).toString().cyan + "\n");
