const { input } = require("./input");
const colors = require("colors");

const navigate = (input) => {
    const directions = {
        N: {
            x: 0,
            y: -1,
        },
        E: {
            x: 1,
            y: 0,
        },
        S: {
            x: 0,
            y: 1,
        },
        W: {
            x: -1,
            y: 0,
        },
    };
    let direction = 90;
    let xPosition = 0;
    let yPosition = 0;

    input.forEach((val) => {
        determineDirection(val[0], parseInt(val.slice(1, val.length)));
    });

    return `X: ${xPosition}, Y: ${yPosition}, sum: ${xPosition + yPosition}`;

    function determineDirection(letter, value) {
        switch (letter) {
            case "N":
            case "E":
            case "S":
            case "W":
                xPosition += directions[letter].x * value;
                yPosition += directions[letter].y * value;
                break;
            case "L":
            case "R":
                direction = mod(direction + (letter === "L" ? -1 : 1) * value, 360);
                break;
            case "F":
                switch (direction) {
                    case 0:
                        xPosition += directions["N"].x * value;
                        yPosition += directions["N"].y * value;
                        break;
                    case 90:
                        xPosition += directions["E"].x * value;
                        yPosition += directions["E"].y * value;
                        break;
                    case 180:
                        xPosition += directions["S"].x * value;
                        yPosition += directions["S"].y * value;
                        break;
                    case 270:
                        xPosition += directions["W"].x * value;
                        yPosition += directions["W"].y * value;
                        break;
                    default:
                        throw new Error("Error 2!");
                }
                break;
            default:
                throw new Error("Error!");
        }
    }

    function mod(n, m) {
        return ((n % m) + m) % m;
    }
};

navigateAgain = (input) => {
    const directions = {
        N: {
            x: 0,
            y: -1,
        },
        E: {
            x: 1,
            y: 0,
        },
        S: {
            x: 0,
            y: 1,
        },
        W: {
            x: -1,
            y: 0,
        },
    };
    let waypointPosition = [10, -1];
    let xPosition = 0;
    let yPosition = 0;

    input.forEach((val) => {
        determineDirection(val[0], parseInt(val.slice(1, val.length)));
    });

    return `X: ${xPosition}, Y: ${yPosition}, sum: ${xPosition + yPosition}`;

    function determineDirection(letter, value) {
        switch (letter) {
            case "N":
            case "E":
            case "S":
            case "W":
                waypointPosition[0] += directions[letter].x * value;
                waypointPosition[1] += directions[letter].y * value;
                break;
            case "L":
            case "R":
                let direction = mod((letter === "L" ? -1 : 1) * value, 360);
                switch (direction) {
                    case 0:
                        break;
                    case 90:
                        waypointPosition = [-waypointPosition[1], waypointPosition[0]];
                        break;
                    case 180:
                        waypointPosition = [-waypointPosition[0], -waypointPosition[1]];
                        break;
                    case 270:
                        waypointPosition = [waypointPosition[1], -waypointPosition[0]];
                        break;
                    default:
                        throw new Error("Error!");
                }
                break;
            case "F":
                xPosition += value * waypointPosition[0];
                yPosition += value * waypointPosition[1];
                break;
            default:
                throw new Error("Error!!!");
        }
    }

    function mod(n, m) {
        return ((n % m) + m) % m;
    }
};

console.log("--- Day 12: Rain Risk ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + navigate(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + navigateAgain(input).toString().cyan + "\n");
