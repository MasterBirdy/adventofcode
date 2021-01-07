const { input } = require("./input");
const colors = require("colors");

const getBags = (input) => {
    const bagRegex = /[a-z]{1,} [a-z]{1,} bag/g;
    const found = {};
    const stack = ["shiny gold"];
    const allBags = input.reduce((acc, cur) => {
        const allBags = cur.match(bagRegex);
        const [first, second] = allBags[0].split(" ");
        for (let i = 1; i < allBags.length; i++) {
            const [firstWord, secondWord] = allBags[i].split(" ");
            if (!acc[`${firstWord} ${secondWord}`]) {
                acc[`${firstWord} ${secondWord}`] = [];
            }
            acc[`${firstWord} ${secondWord}`].push(`${first} ${second}`);
        }
        return acc;
    }, {});
    while (stack.length) {
        const bag = stack.pop();
        if (allBags[bag]) {
            allBags[bag].forEach((innerBag) => {
                if (!found[innerBag]) {
                    stack.push(innerBag);
                    found[innerBag] = 1;
                }
            });
        }
    }
    return Object.keys(found).length;
};

const getBagsAgain = (input) => {
    const firstBagRegex = /[a-z]{1,} [a-z]{1,} bag/;
    const numberBagRegex = /[0-9]{1,} [a-z]{1,} [a-z]{1,} bag/g;
    const allBags = input.reduce((acc, cur) => {
        const [first, second] = cur.match(firstBagRegex)[0].split(" ");
        if (!acc[`${first} ${second}`]) {
            acc[`${first} ${second}`] = [];
        }
        const numberedBags = cur.match(numberBagRegex) || [];
        for (let i = 0; i < numberedBags.length; i++) {
            const [number, firstWord, secondWord] = numberedBags[i].split(" ");
            if (`${firstWord} ${secondWord}` !== "no other") {
                acc[`${first} ${second}`].push([`${firstWord} ${secondWord}`, parseInt(number)]);
            }
        }
        return acc;
    }, {});
    return helperFunction("shiny gold") - 1;

    function helperFunction(str) {
        let sum = 1;
        allBags[str].forEach(([word, number]) => {
            sum += number * helperFunction(word);
        });
        return sum;
    }
};

console.log("--- Day 7: Handy Haversacks ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + getBags(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + getBagsAgain(input).toString().cyan + "\n");
