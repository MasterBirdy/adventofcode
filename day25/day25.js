const colors = require("colors");

function transform(subjectNumber, loopSize) {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value *= subjectNumber;
        value %= 20201227;
    }
    return value;
}

function findLoopSize(subjectNumber, publicKey) {
    let value = 1;
    let loopSize = 0;
    while (value !== publicKey) {
        value *= subjectNumber;
        value %= 20201227;
        loopSize++;
    }
    return loopSize;
}

const cardPublicKey = 12578151;

const doorPublicKey = 5051300;

const cardLoopSize = findLoopSize(7, cardPublicKey);
const doorLoopSize = findLoopSize(7, doorPublicKey);

console.log("--- Day 25: Combo Breaker ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + transform(cardPublicKey, doorLoopSize).toString().cyan + "\n");
console.log("ANSWER\n".bold + transform(doorPublicKey, cardLoopSize).toString().cyan + "\n");
