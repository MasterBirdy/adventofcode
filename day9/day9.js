const input = require("./input");
const colors = require("colors");

const xams = (input) => {
    let availableNumbers = input
        .slice(0, 25)
        .map((num, pos) => [parseInt(num), pos])
        .sort((a, b) => a[0] - b[0]);

    for (let i = 25; i < input.length; i++) {
        let low = 0;
        let high = availableNumbers.length - 1;
        let foundNumber = false;
        while (low < high) {
            const sum = availableNumbers[low][0] + availableNumbers[high][0];
            if (parseInt(input[i]) === sum) {
                foundNumber = true;
                break;
            } else if (parseInt(input[i]) < sum) {
                high--;
            } else {
                low++;
            }
        }
        if (!foundNumber) {
            return input[i];
        }
        const newAdd = [parseInt(input[i]), i];
        availableNumbers = [...availableNumbers, newAdd].filter((num) => num[1] > i - 25).sort((a, b) => a[0] - b[0]);
    }
    return -1;
};

const xamsAgain = (input) => {
    const goal = 36845998;
    let low = 0;
    let high = 1;
    let sum = parseInt(input[low]) + parseInt(input[high]);
    while (low < high) {
        if (sum === goal) {
            return `LOW: ${input[low]}, HIGH: ${input[high]}, SUM: ${parseInt(input[low]) + parseInt(input[high])}`;
        } else if (sum < goal) {
            high++;
            sum += parseInt(input[high]);
        } else {
            sum -= parseInt(input[low]);
            low++;
        }
    }
};

console.log("--- Day 9: Encoding Error ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + xams(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + xamsAgain(input).toString().cyan + "\n");
