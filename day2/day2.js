const input = require("./input");
const colors = require("colors");

const validate = (input) => {
    return input.reduce((acc, cur) => {
        const splitArray = cur.split(" ");
        const splitNumbers = splitArray[0].split("-");
        const [min, max] = splitNumbers;
        const searchedCharacter = splitArray[1][0];
        const re = new RegExp(searchedCharacter, "g");
        const count = (splitArray[2].match(re) || []).length;
        if (count >= parseInt(min) && count <= parseInt(max)) {
            acc++;
        }
        return acc;
    }, 0);
};

const validateAgain = (input) => {
    return input.reduce((acc, cur) => {
        const splitArray = cur.split(" ");
        const splitNumbers = splitArray[0].split("-");
        const [left, right] = splitNumbers;
        const searchedCharacter = splitArray[1][0];
        const leftCharacter = splitArray[2][parseInt(left - 1)];
        const rightCharacter = splitArray[2][parseInt(right - 1)];
        if ((leftCharacter === searchedCharacter && rightCharacter !== searchedCharacter) || (leftCharacter !== searchedCharacter && rightCharacter === searchedCharacter)) {
            acc++;
        }
        return acc;
    }, 0);
};

console.log("--- Day 2: Password Philosophy ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);
console.log("ANSWER\n".bold + validate(input).toString().cyan + "\n");
console.log("PART 2:".yellow.bold);
console.log("ANSWER\n".bold + validateAgain(input).toString().cyan);
