const input = require("./input");
const colors = require("colors");

const count = (input) => {
    return input.reduce((acc, cur) => {
        const splitArray = cur.split(" ");
        let allKeysObject = {};
        splitArray.forEach((word) => {
            word.split("").forEach((letter) => {
                allKeysObject[letter] = 1;
            });
        });
        return acc + Object.keys(allKeysObject).length;
    }, 0);
};

const countAgain = (input) => {
    return input.reduce((acc, cur) => {
        const splitArray = cur.split(" ");
        let allKeysObject = {};
        let firstTime = true;
        splitArray.forEach((word) => {
            let newKeysObject = {};
            if (Object.keys(allKeysObject).length === 0 && firstTime) {
                newKeysObject = word.split("").reduce((acc, cur) => {
                    if (!acc[cur]) acc[cur] = 1;
                    return acc;
                }, {});
            } else {
                const filteredKeys = word.split("").filter((letter) => allKeysObject[letter]);
                filteredKeys.forEach((letter) => {
                    newKeysObject[letter] = 1;
                });
            }
            firstTime = false;
            allKeysObject = newKeysObject;
        });
        return acc + Object.keys(allKeysObject).length;
    }, 0);
};

console.log("--- Day 6: Custom Customs ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + count(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + countAgain(input).toString().cyan + "\n");
