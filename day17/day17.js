const colors = require("colors");

const cubes = (input, iterations) => {
    let cube = input;

    for (let i = 0; i < iterations; i++) {
        const tempCube = growCube(cube, cube.length);
        conwayTheCube(tempCube);
        cube = tempCube;
    }

    return cube.reduce((acc, cur) => {
        cur.forEach((row) => {
            row.forEach((cell) => {
                if (cell === "#") {
                    acc++;
                }
            });
        });
        return acc;
    }, 0);

    function conwayTheCube(tempCube) {
        for (let i = 0; i < tempCube.length; i++) {
            for (let j = 0; j < tempCube[i].length; j++) {
                for (let k = 0; k < tempCube[i][j].length; k++) {
                    const symbol = tempCube[i][j][k];
                    const count = activeCount(i, j, k);
                    if (symbol === "#" && (count < 2 || count > 3)) {
                        tempCube[i][j][k] = ".";
                    } else if (symbol === "." && count === 3) {
                        tempCube[i][j][k] = "#";
                    }
                }
            }
        }
    }

    function activeCount(x, y, z) {
        let count = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            if (i >= 1 && i <= cube.length) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (j >= 1 && j <= cube[0].length) {
                        for (let k = z - 1; k <= z + 1; k++) {
                            if (k >= 1 && k <= cube[0][0].length) {
                                if (!(i === x && j === y && k === z) && cube[i - 1][j - 1][k - 1] === "#") {
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return count;
    }

    function growCube(cube, depth) {
        const newCube = [];
        const length = cube[0].length;
        const width = cube[0][0].length;
        for (let i = 0; i < depth + 2; i++) {
            const slice = [];
            if (i === 0 || i === depth + 1) {
                for (let j = 0; j < length + 2; j++) {
                    const row = new Array(width + 2).fill(".");
                    slice.push(row);
                }
            } else {
                for (let j = 0; j < length + 2; j++) {
                    let row;
                    if (j === 0 || j === length + 1) {
                        row = new Array(width + 2).fill(".");
                    } else {
                        row = [".", ...cube[i - 1][j - 1], "."];
                    }
                    slice.push(row);
                }
            }
            newCube.push(slice);
        }
        return newCube;
    }
};

const cubesAgain = (input, iterations) => {
    let cube = input;

    for (let i = 0; i < iterations; i++) {
        const tempCube = growCubeMore(cube, cube.length);
        conwayTheCube(tempCube);
        cube = tempCube;
    }

    return cube.reduce((acc, cur) => {
        cur.forEach((grid) => {
            grid.forEach((row) => {
                row.forEach((cell) => {
                    if (cell === "#") {
                        acc++;
                    }
                });
            });
        });
        return acc;
    }, 0);

    function conwayTheCube(tempCube) {
        for (let i = 0; i < tempCube.length; i++) {
            for (let j = 0; j < tempCube[i].length; j++) {
                for (let k = 0; k < tempCube[i][j].length; k++) {
                    for (let l = 0; l < tempCube[i][j][k].length; l++) {
                        const symbol = tempCube[i][j][k][l];
                        const count = activeCount(i, j, k, l);
                        // console.log(symbol, "count: ", count, "coordinates: ", i - 1, j - 2, k - 2);
                        if (symbol === "#" && (count < 2 || count > 3)) {
                            tempCube[i][j][k][l] = ".";
                        } else if (symbol === "." && count === 3) {
                            tempCube[i][j][k][l] = "#";
                        }
                    }
                }
            }
        }
    }

    function activeCount(x, y, z, a) {
        let count = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            if (i >= 1 && i <= cube.length) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (j >= 1 && j <= cube[0].length) {
                        for (let k = z - 1; k <= z + 1; k++) {
                            if (k >= 1 && k <= cube[0][0].length) {
                                for (let l = a - 1; l <= a + 1; l++) {
                                    if (l >= 1 && l <= cube[0][0][0].length) {
                                        if (!(i === x && j === y && k === z && l === a) && cube[i - 1][j - 1][k - 1][l - 1] === "#") {
                                            count++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return count;
    }

    function growCubeMore(cube, depth) {
        const newCube = [];
        const length = cube[0][0].length;
        const width = cube[0][0][0].length;
        for (let i = 0; i < depth + 2; i++) {
            newCube[i] = [];
            for (let k = 0; k < depth + 2; k++) {
                const slice = [];
                if (i === 0 || i === depth + 1 || k === 0 || k === depth + 1) {
                    for (let j = 0; j < length + 2; j++) {
                        const row = new Array(width + 2).fill(".");
                        slice.push(row);
                    }
                } else {
                    for (let j = 0; j < length + 2; j++) {
                        let row;
                        if (j === 0 || j === length + 1) {
                            row = new Array(width + 2).fill(".");
                        } else {
                            row = [".", ...cube[i - 1][k - 1][j - 1], "."];
                        }
                        slice.push(row);
                    }
                }
                newCube[i].push(slice);
            }
        }
        return newCube;
    }
};

const input = [
    [
        [".", "#", ".", "#", ".", ".", "#", "#"],
        [".", ".", "#", ".", ".", ".", ".", "#"],
        ["#", "#", ".", "#", "#", "#", "#", "."],
        [".", ".", ".", "#", "#", "#", "#", "."],
        ["#", ".", "#", "#", ".", ".", "#", "#"],
        ["#", ".", ".", ".", "#", "#", ".", "."],
        [".", ".", ".", "#", "#", ".", "#", "#"],
        ["#", ".", ".", ".", "#", ".", "#", "."],
    ],
];

const input2 = [
    [
        [
            [".", "#", ".", "#", ".", ".", "#", "#"],
            [".", ".", "#", ".", ".", ".", ".", "#"],
            ["#", "#", ".", "#", "#", "#", "#", "."],
            [".", ".", ".", "#", "#", "#", "#", "."],
            ["#", ".", "#", "#", ".", ".", "#", "#"],
            ["#", ".", ".", ".", "#", "#", ".", "."],
            [".", ".", ".", "#", "#", ".", "#", "#"],
            ["#", ".", ".", ".", "#", ".", "#", "."],
        ],
    ],
];

console.log("--- Day 17: Conway Cubes ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + cubes(input, 6).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + cubesAgain(input2, 6).toString().cyan + "\n");
