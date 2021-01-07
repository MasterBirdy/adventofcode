const { input } = require("./input");
const colors = require("colors");

const findSeat = (input, first = false) => {
    let hasChanged = true;
    let currentGrid = [...input];
    currentGrid.forEach((row, index) => {
        currentGrid[index] = row.split("");
    });

    while (hasChanged) {
        hasChanged = false;
        let newGrid = [...currentGrid];
        newGrid.forEach((row, index) => {
            newGrid[index] = [...row];
        });
        for (let i = 0; i < currentGrid.length; i++) {
            for (let j = 0; j < currentGrid[i].length; j++) {
                if (currentGrid[i][j] !== ".") {
                    const symbol = currentGrid[i][j];
                    const transform = first ? checkTransformOld(i, j, symbol) : checkTransform(i, j, symbol);
                    if (transform) {
                        hasChanged = true;
                        if (symbol === "L") {
                            newGrid[i][j] = "#";
                        } else {
                            newGrid[i][j] = "L";
                        }
                    }
                }
            }
        }
        currentGrid = newGrid;
    }

    return currentGrid.reduce((acc, cur) => {
        return (
            acc +
            cur.reduce((a, c) => {
                if (c === "#") a++;
                return a;
            }, 0)
        );
    }, 0);

    function checkTransformOld(row, column, symbol) {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
                if (!(i === row && j === column) && !(i < 0 || i >= currentGrid.length || j < 0 || j >= currentGrid[0].length)) {
                    const testSymbol = currentGrid[i][j];
                    if (testSymbol === "#") {
                        count++;
                    }
                }
            }
        }

        if (symbol === "L") {
            return count === 0;
        } else if (symbol === "#") {
            return count >= 4;
        } else {
            throw new Error("Error with transform!");
        }
    }

    function checkTransform(row, column, symbol) {
        const array = [];
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = column - 1; j <= column + 1; j++) {
                if (!(i === row && j === column) && !(i < 0 || i >= currentGrid.length || j < 0 || j >= currentGrid[0].length)) {
                    let testRow = i;
                    let testColumn = j;
                    const columnSlope = j - column;
                    const rowSlope = i - row;
                    while (!(testRow < 0 || testRow >= currentGrid.length || testColumn < 0 || testColumn >= currentGrid[0].length)) {
                        const testSymbol = currentGrid[testRow][testColumn];
                        if (testSymbol === "L" || testSymbol === "#") {
                            array.push([testRow, testColumn]);
                            break;
                        }
                        testRow += rowSlope;
                        testColumn += columnSlope;
                    }
                }
            }
        }
        if (symbol === "L") {
            return count(array, ["L"]) === array.length;
        } else if (symbol === "#") {
            return count(array, ["#"]) >= 5;
        } else {
            throw new Error("Error with transform!");
        }

        function count(arr, acceptedSymbols) {
            return arr.reduce((acc, cur) => {
                if (acceptedSymbols.some((sym) => sym === currentGrid[cur[0]][cur[1]])) {
                    acc++;
                }
                return acc;
            }, 0);
        }
    }
};

console.log("--- Day 11: Seating System ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + findSeat(input, true).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + findSeat(input).toString().cyan + "\n");
