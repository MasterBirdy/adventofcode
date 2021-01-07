const input = require("./input");
const colors = require("colors");

const memoryMaskOld = (input) => {
    let mask = "";
    const allMem = {};
    input.forEach((i) => {
        const line = i.split(" ");
        if (/mask/g.test(line[0])) {
            mask = line[2];
        } else {
            const memoryLocation = line[0].match(/[0-9]+/g);
            const value = parseInt(line[2]);
            const binaryNumber = Number(parseInt(value)).toString(2);
            const formattedBinaryNumber = new Array(36 - binaryNumber.length + 1).join("0") + binaryNumber;
            const maskedNumber = formattedBinaryNumber.split("").reduce((acc, cur, index) => {
                if (mask[index] === "1") {
                    acc += "1";
                } else if (mask[index] === "0") {
                    acc += "0";
                } else {
                    acc += cur;
                }
                return acc;
            }, "");
            allMem[memoryLocation] = maskedNumber;
        }
    });

    return Object.keys(allMem).reduce((acc, cur) => {
        return acc + parseInt(allMem[cur], 2);
    }, 0);
};

const memoryMask = (input) => {
    let mask = "";
    const allMem = input.reduce((acc, cur) => {
        const line = cur.split(" ");
        if (/mask/g.test(line[0])) {
            mask = line[2];
        } else {
            const memoryLocation = line[0].match(/[0-9]+/g);
            const value = parseInt(line[2]);
            const binaryNumber = Number(parseInt(memoryLocation)).toString(2);
            const formattedBinaryNumber = new Array(36 - binaryNumber.length + 1).join("0") + binaryNumber;
            const maskedNumber = formattedBinaryNumber.split("").reduce((acc, cur, index) => {
                if (mask[index] === "1" || mask[index] === "X") {
                    acc += mask[index];
                } else {
                    acc += cur;
                }
                return acc;
            }, "");
            const allMaskedNumbers = newRecursive(maskedNumber);

            allMaskedNumbers.forEach((val) => {
                acc[val] = value;
            });
        }
        return acc;

        function newRecursive(str, memo = {}) {
            if (!str.length) return [];
            if (memo[str.length]) return memo[str.length];
            let result;
            const suffixWays = newRecursive(str.slice(1), memo);
            if (str[0] === "X") {
                if (!suffixWays.length) {
                    result = ["0", "1"];
                } else {
                    const zeroWays = suffixWays.map((way) => "0" + way);
                    const oneWays = suffixWays.map((way) => "1" + way);
                    result = [...zeroWays, ...oneWays];
                }
            } else {
                if (!suffixWays.length) {
                    result = [str[0]];
                } else {
                    const allWays = suffixWays.map((way) => str[0] + way);
                    result = [...allWays];
                }
            }

            memo[str.length] = result;
            return result;
        }
    }, {});

    return Object.keys(allMem).reduce((acc, cur) => acc + allMem[cur], 0);
};

console.log("--- Day 14: Docking Data ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + memoryMaskOld(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + memoryMask(input).toString().cyan + "\n");
