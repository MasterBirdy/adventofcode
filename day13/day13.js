const { buses, timestamp } = require("./input");
const colors = require("colors");

const minBus = (timestamp, buses) => {
    const allBuses = buses.filter((bus) => bus !== "x");
    let minBusID = -1;
    let total = Infinity;
    const dict = allBuses.reduce((acc, cur) => {
        const minutes = parseInt(cur);
        const numberOfRounds = Math.ceil(timestamp / minutes);
        const totalTime = minutes * numberOfRounds;
        acc[cur] = minutes * (totalTime - timestamp);
        if (totalTime < total) {
            minBusID = minutes;
            total = totalTime;
        }
        return acc;
    }, {});

    return `${minBusID}: ${dict[minBusID]}`;
};

const minBusAgain = (buses) => {
    const otherBuses = buses
        .map((bus, index) => [bus, index])
        .filter((bus) => bus[0] !== "x")
        .map((bus) => [mod(-bus[1], parseInt(bus[0])), parseInt(bus[0])]);

    const sum = otherBuses.reduce((acc, cur) => {
        return acc * cur[1];
    }, 1);

    const answers = otherBuses.map((bus) => {
        const bigNum = sum / bus[1];
        const remainder = bigNum % bus[1];
        let tempSum = remainder;
        let count = 1;
        while (true) {
            if (tempSum % bus[1] === 1) break;
            tempSum += remainder;
            count++;
        }
        return BigInt(bus[0]) * BigInt(bigNum) * BigInt(count);
    });

    return answers.reduce((acc, cur) => acc + cur, 0n) % BigInt(sum);

    function mod(n, m) {
        return ((n % m) + m) % m;
    }
};

console.log("--- Day 13: Shuttle Search ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + minBus(timestamp, buses).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + minBusAgain(buses).toString().cyan + "\n");
