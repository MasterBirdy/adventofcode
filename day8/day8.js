const input = require("./input");
const colors = require("colors");

const findLoop = (input) => {
    const visited = {};
    let accumulated = 0;
    let position = 0;
    while (!visited[position]) {
        const [symbol, value] = input[position].split(" ");
        const intValue = parseInt(value.replace("+", ""));
        visited[position] = true;
        if (symbol === "jmp") {
            position += intValue;
        } else {
            if (symbol === "acc") {
                accumulated += intValue;
            }
            position++;
        }
    }
    return accumulated;
};

const findLoopAgain = (input, visited = {}, position = 0, accumulated = 0, changed = false) => {
    if (position === input.length) {
        return accumulated;
    }
    if (position > input.length) return null;
    if (visited[position]) return null;
    const [symbol, value] = input[position].split(" ");
    const intValue = parseInt(value.replace("+", ""));
    visited[position] = true;
    if (symbol === "jmp" || symbol === "nop") {
        const firstPosition = position + intValue;
        if (!changed) {
            const answer = findLoopAgain(input, { ...visited }, firstPosition, accumulated, symbol === "nop") || findLoopAgain(input, { ...visited }, position + 1, accumulated, symbol === "jmp");
            return answer;
        } else if (symbol === "jmp") {
            return findLoopAgain(input, visited, firstPosition, accumulated, changed);
        } else {
            return findLoopAgain(input, visited, position + 1, accumulated, changed);
        }
    } else {
        return findLoopAgain(input, visited, position + 1, accumulated + intValue, changed);
    }
};

console.log("--- Day 9: Encoding Error ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + findLoop(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + findLoopAgain(input).toString().cyan + "\n");
