const input = require("./input");
const colors = require("colors");

const navigate = (input) => {
    let startingPosition = 0;
    let stringLength = input[0].length;
    let treeCount = 0;
    for (let i = 1; i < input.length; i++) {
        startingPosition = startingPosition + 3;
        if (startingPosition > stringLength - 1) {
            startingPosition = startingPosition - stringLength;
        }
        if (input[i][startingPosition] === "#") {
            treeCount++;
        }
    }
    return treeCount;
};

const navigateTwo = (input) => {
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];
    let stringLength = input[0].length;
    return slopes
        .map((slope) => {
            let startingPosition = 0;
            let treeCount = 0;
            for (let i = slope[1]; i < input.length; i = i + slope[1]) {
                startingPosition = startingPosition + slope[0];
                if (startingPosition > stringLength - 1) {
                    startingPosition = startingPosition - stringLength;
                }
                if (input[i][startingPosition] === "#") {
                    treeCount++;
                }
            }
            return treeCount;
        })
        .reduce((acc, cur) => acc * cur, 1);
};

console.log("--- Day 3: Toboggan Trajectory ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + navigate(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + navigateTwo(input).toString().cyan + "\n");
