const input = require("./input");
const colors = require("colors");

const directions = {
    e: [0, 1],
    se: [1, 1],
    sw: [1, 0],
    w: [0, -1],
    nw: [-1, -1],
    ne: [-1, 0],
};

const MAX_VALUE = 200;

const flipTiles = (input, first = true) => {
    let grid = [];
    for (let i = 0; i < MAX_VALUE; i++) {
        grid.push(new Array(MAX_VALUE).fill("w"));
    }
    input.forEach((line) => {
        const tile = [MAX_VALUE / 2, MAX_VALUE / 2];
        let [y, x] = [0, 0];
        const stack = line.split("");
        while (stack.length) {
            let direction = stack.shift();
            if (direction === "n" || direction === "s") {
                direction += stack.shift();
            }
            y += directions[direction][0];
            x += directions[direction][1];
        }
        tile[0] += y;
        tile[1] += x;
        if (grid[tile[0]][tile[1]] === "w") {
            grid[tile[0]][tile[1]] = "b";
        } else {
            grid[tile[0]][tile[1]] = "w";
        }
    });

    if (first) {
        return grid.reduce((acc, cur) => {
            let sum = cur.reduce((a, c) => {
                if (c === "b") {
                    return a + 1;
                }
                return a;
            }, 0);
            return acc + sum;
        }, 0);
    }

    for (let i = 0; i < 100; i++) {
        const newGrid = [];
        for (let j = 0; j < MAX_VALUE; j++) {
            const newRow = [];
            for (let k = 0; k < MAX_VALUE; k++) {
                let value = grid[j][k];
                const { blackCount } = count(j, k);
                if (value === "b" && (blackCount === 0 || blackCount > 2)) {
                    newRow[k] = "w";
                } else if (value === "w" && blackCount === 2) {
                    newRow[k] = "b";
                } else {
                    newRow[k] = value;
                }
            }
            newGrid.push(newRow);
        }
        grid = newGrid;
    }

    return grid.reduce((acc, cur) => {
        return (
            acc +
            cur.reduce((a, c) => {
                if (c === "b") {
                    a++;
                }
                return a;
            }, 0)
        );
    }, 0);

    function count(y, x) {
        let whiteCount = 0;
        let blackCount = 0;
        Object.values(directions).forEach(([valueY, valueX]) => {
            let tempY = y + valueY;
            let tempX = x + valueX;
            if (!(tempY < 0 || tempY >= MAX_VALUE) && !(tempX < 0 || tempX >= MAX_VALUE)) {
                let value = grid[tempY][tempX];
                if (value === "w") {
                    whiteCount++;
                } else if (value === "b") {
                    blackCount++;
                }
            }
        });
        return { whiteCount, blackCount };
    }
};

console.log("--- Day 24: Lobby Layout ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + flipTiles(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + flipTiles(input, false).toString().cyan + "\n");
