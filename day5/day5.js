const input = require("./input");
const colors = require("colors");

const boarding = (input) => {
    return Math.max(
        ...input.map((seat) => {
            const fbBinary = seat.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1");
            const columnString = seat.slice(7).replace(/L/g, "0").replace(/R/g, "1");
            const seatNumber = parseInt(fbBinary, 2);
            const columnNumber = parseInt(columnString, 2);
            return seatNumber * 8 + columnNumber;
        })
    );
};

const boardingAgain = (input) => {
    const allSeats = {};
    for (let i = 0; i <= 944; i++) {
        allSeats[i] = 1;
    }
    input.forEach((seat) => {
        const fbBinary = seat.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1");
        const columnString = seat.slice(7).replace(/L/g, "0").replace(/R/g, "1");
        const seatNumber = parseInt(fbBinary, 2);
        const columnNumber = parseInt(columnString, 2);
        const rowNumber = seatNumber * 8 + columnNumber;
        if (allSeats[rowNumber]) {
            delete allSeats[rowNumber];
        }
    });
    return Object.keys(allSeats);
};

console.log("--- Day 5: Binary Boarding ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + boarding(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + boardingAgain(input).toString().cyan + "\n");
