const input = require("./input");
const colors = require("colors");

const findSumOfTwo = (input) => {
    const dict = input.reduce((acc, cur) => {
        acc[cur] = 1;
        return acc;
    }, {});
    let answerToReturn = -1;
    for (let i = 0; i < input.length; i++) {
        const answer = 2020 - input[i];
        if (dict[answer]) {
            console.log("NUMBER PAIR:".bold);
            console.log(input[i].toString().bold.magenta, answer.toString().bold.magenta);
            answerToReturn = input[i] * answer;
            break;
        }
    }
    return answerToReturn;
};

const threeSum = (input) => {
    input.sort((a, b) => a - b);
    let answer = null;
    for (let i = 0; i < input.length - 2; i++) {
        let low = i + 1;
        let high = input.length - 1;
        while (low < high) {
            let computedAnswer = 2020 - input[i] - input[low] - input[high];
            if (computedAnswer === 0) {
                console.log("NUMBER PAIR:".bold);
                console.log(input[i].toString().bold.magenta, input[low].toString().bold.magenta, input[high].toString().bold.magenta);
                answer = input[i] * input[low] * input[high];
                break;
            } else if (computedAnswer < 0) {
                high--;
            } else {
                low++;
            }
        }
        if (answer) break;
    }
    return answer;
};

console.log("--- Day 1: Report Repair ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER:\n".bold + findSumOfTwo(input).toString().bold.magenta);

console.log("\nPART 2:".yellow.bold);
console.log("ANSWER:\n".bold + threeSum(input).toString().bold.magenta);
