const input = require("./input");
const colors = require("colors");

const numberRegex = /[0-9]+/g;
const firstLineRegex = /..................#./;
const secondLineRegex = /#....##....##....###/;
const thirdLineRegex = /.#..#..#..#..#..#.../;

const directions = {
    0: "top",
    1: "right",
    2: "bottom",
    3: "left",
};

const oldMonsterInputs = (input) => {
    const tiles = input.reduce((acc, cur) => {
        const current = cur.split(",");
        const key = current[0].match(numberRegex)[0];
        const grid = current.slice(1).reduce((a, c) => {
            a.push(c.split(""));
            return a;
        }, []);
        acc[key] = grid;
        const flippedGrid = [];
        grid.forEach((row) => {
            const newRow = row.slice();
            flip1D(newRow);
            flippedGrid.push(newRow);
        });
        acc[`flipped-${key}`] = flippedGrid;
        return acc;
    }, {});

    const edges = {};

    const allTiles = Object.keys(tiles);

    const sharedEdges = {};

    for (let i = 0; i < allTiles.length; i++) {
        const gridEdges = grabEdges(tiles[allTiles[i]]);
        edges[allTiles[i]] = gridEdges;
        gridEdges.forEach((edge, index) => {
            const edgeName = edge.toString();
            if (!sharedEdges[edgeName]) {
                sharedEdges[edgeName] = [`${allTiles[i]}:${index}`];
            } else {
                sharedEdges[edgeName].push(`${allTiles[i]}:${index}`);
            }
        });
    }

    const counter = {};

    Object.keys(sharedEdges).forEach((edge) => {
        const names = sharedEdges[edge];
        if (names.length === 1) {
            const [key] = names[0].match(/(flipped-)?[0-9]+/g);
            const [number] = names[0].match(/:\d/g);
            const orientation = number[1];
            if (!counter[key]) {
                counter[key] = [orientation];
            } else {
                counter[key].push(orientation);
            }
        }
    });

    Object.keys(counter).forEach((key) => {
        if (counter[key].length !== 2 || key.includes("flipped")) {
            delete counter[key];
        }
    });

    return Object.keys(counter).reduce((acc, cur) => acc * parseInt(cur), 1);

    function grabEdges(grid) {
        const top = grid[0].reduce((acc, cur) => {
            acc.push(cur);
            return acc;
        }, []);
        const right = [];
        for (let i = 0; i < grid.length; i++) {
            right.push(grid[i][grid[0].length - 1]);
        }
        const bottom = [];
        for (let i = grid[0].length - 1; i >= 0; i--) {
            bottom.push(grid[grid.length - 1][i]);
        }
        const left = [];
        for (let i = grid.length - 1; i >= 0; i--) {
            left.push(grid[i][0]);
        }
        return [top, right, bottom, left];
    }
};

const monsterInputs = (input) => {
    const tiles = input.reduce((acc, cur) => {
        const current = cur.split(",");
        const key = current[0].match(numberRegex)[0];
        const grid = current.slice(1).reduce((a, c) => {
            a.push(c.split(""));
            return a;
        }, []);
        acc[key] = grid;
        const flippedGrid = [];
        grid.forEach((row) => {
            const newRow = row.slice();
            flip1D(newRow);
            flippedGrid.push(newRow);
        });
        acc[`flipped-${key}`] = flippedGrid;
        return acc;
    }, {});

    const edges = {};

    const allTiles = Object.keys(tiles);

    const sharedEdges = {};

    for (let i = 0; i < allTiles.length; i++) {
        const gridEdges = grabEdges(tiles[allTiles[i]]);
        edges[allTiles[i]] = gridEdges;
        gridEdges.forEach((edge, index) => {
            const edgeName = edge.toString();
            if (!sharedEdges[edgeName]) {
                sharedEdges[edgeName] = [`${allTiles[i]}:${index}`];
            } else {
                sharedEdges[edgeName].push(`${allTiles[i]}:${index}`);
            }
        });
    }

    const counter = {};

    Object.keys(sharedEdges).forEach((edge) => {
        const names = sharedEdges[edge];
        if (names.length === 1) {
            const [key] = names[0].match(/(flipped-)?[0-9]+/g);
            const [number] = names[0].match(/:\d/g);
            const orientation = number[1];
            if (!counter[key]) {
                counter[key] = [orientation];
            } else {
                counter[key].push(orientation);
            }
        }
    });

    Object.keys(counter).forEach((key) => {
        if (counter[key].length !== 2) {
            delete counter[key];
        }
    });

    const topRow = [
        {
            id: 1453,
            rotated: 0,
            flipped: false,
        },
    ];

    for (let i = 1; i < 12; i++) {
        let left = topRow[i - 1].rotated <= 1 ? 1 - topRow[i - 1].rotated : 5 - topRow[i - 1].rotated;
        findRestOfRow(topRow[i - 1], topRow, left, 3);
    }

    const grid = [topRow];

    for (let i = 1; i < 12; i++) {
        const row = [];
        let bottom = grid[i - 1][0].rotated === 3 ? 3 : 2 - grid[i - 1][0].rotated;
        findRestOfRow(grid[i - 1][0], row, bottom, 0);
        for (let j = 1; j < 12; j++) {
            let left = row[j - 1].rotated <= 1 ? 1 - row[j - 1].rotated : 5 - row[j - 1].rotated;
            findRestOfRow(row[j - 1], row, left, 3);
        }
        grid.push(row);
    }

    const picture = [];
    grid.forEach((row) => {
        const pictureRow = row.map((obj) => {
            let key = `${obj.flipped ? "flipped-" : ""}${obj.id}`;
            const cell = tiles[key];
            for (let i = 0; i < obj.rotated; i++) {
                rotate(cell);
            }
            const returnedCell = shrinkArray(cell);
            return returnedCell;
        });
        picture.push(pictureRow);
    });

    const newPicture = [];
    picture.forEach((row) => {
        const newRow = [];
        row.forEach((cell) => {
            cell.forEach((line, index) => {
                if (!newRow[index]) {
                    newRow[index] = [];
                }
                newRow[index].push(...line);
            });
        });
        newPicture.push(newRow);
    });

    const newNewPicture = [];
    newPicture.forEach((block) => {
        newNewPicture.push(...block);
    });

    const dragonCounter = {};

    const joinedPicture = createPicture(newNewPicture);

    const characters = characterCount(joinedPicture);

    for (let i = 0; i < 8; i++) {
        const joinedPicture = createPicture(newNewPicture);
        dragonCounter[i] = findDragons(joinedPicture);
        rotate(newNewPicture);
        if (i === 3) {
            flip(newNewPicture);
        }
    }

    return characters - dragonCounter[4] * 15;

    function findDragons(matrix) {
        let counter = 0;
        for (let i = 0; i < matrix.length - 2; i++) {
            let firstLineMatches = {};
            let secondLineMatches = {};
            let thirdLineMatches = {};
            for (let j = 0; j < matrix[i].length - 20; j++) {
                const firstLine = matrix[i].slice(j, j + 20);
                const secondLine = matrix[i + 1].slice(j, j + 20);
                const thirdLine = matrix[i + 2].slice(j, j + 20);
                if (firstLineRegex.test(firstLine)) {
                    firstLineMatches[j] = true;
                }
                if (secondLineRegex.test(secondLine)) {
                    secondLineMatches[j] = true;
                }
                if (thirdLineRegex.test(thirdLine)) {
                    thirdLineMatches[j] = true;
                }
            }
            counter += Object.keys(firstLineMatches).reduce((acc, cur) => {
                if (secondLineMatches[cur] && thirdLineMatches[cur]) {
                    acc++;
                }
                return acc;
            }, 0);
        }
        return counter;
    }

    function createPicture(matrix) {
        return matrix.reduce((acc, cur) => {
            acc.push(cur.join(""));
            return acc;
        }, []);
    }

    function findRestOfRow(ref, row, num, goal) {
        let key = "";
        if (ref.flipped) {
            key += "flipped-";
        }
        key += ref.id;

        const sharedEdge = edges[key][num].slice();

        flip1D(sharedEdge);

        const foundPair = sharedEdges[sharedEdge].find((edge) => {
            return !edge.includes(ref.id);
        });
        if (!foundPair) {
            throw new Error("Couldn't find pair!");
        }
        const flipped = foundPair.includes("flipped");
        const foundID = parseInt(foundPair.match(/[-]?[0-9]+/g)[0].replace("-", ""));
        const orientation = parseInt(foundPair.match(/:\d/g)[0].replace(":", ""));
        const rotationsNeeded = oppositeSide(goal, orientation);
        num = rotateEdges(num, rotationsNeeded);
        row.push({
            id: foundID,
            rotated: rotationsNeeded,
            flipped,
        });
    }

    function rotateEdges(num, rotationsNeeded) {
        for (let i = 0; i < rotationsNeeded; i++) {
            num--;
            if (num < 0) {
                num = 3;
            }
        }
        return num;
    }

    function grabEdges(grid) {
        const top = grid[0].reduce((acc, cur) => {
            acc.push(cur);
            return acc;
        }, []);
        const right = [];
        for (let i = 0; i < grid.length; i++) {
            right.push(grid[i][grid[0].length - 1]);
        }
        const bottom = [];
        for (let i = grid[0].length - 1; i >= 0; i--) {
            bottom.push(grid[grid.length - 1][i]);
        }
        const left = [];
        for (let i = grid.length - 1; i >= 0; i--) {
            left.push(grid[i][0]);
        }
        return [top, right, bottom, left];
    }

    function oppositeSide(goal, num) {
        let counter = 0;
        while (num !== goal) {
            goal--;
            if (goal < 0) {
                goal = 3;
            }
            counter++;
        }
        return counter;
    }
};

const flip = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length / 2; j++) {
            [matrix[i][j], matrix[i][matrix[i].length - j - 1]] = [matrix[i][matrix[i].length - j - 1], matrix[i][j]];
        }
    }
};

const flip1D = function (array) {
    for (let j = 0; j < array.length / 2; j++) {
        [array[j], array[array.length - 1 - j]] = [array[array.length - 1 - j], array[j]];
    }
};

const rotate = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        const n = Math.floor((i + 1) / 2);
        for (let j = 0; j < n; j++) {
            [matrix[j][i - j], matrix[i - j][j]] = [matrix[i - j][j], matrix[j][i - j]];
        }
    }
    for (let i = 1; i < matrix.length; i++) {
        const m = Math.floor((i + matrix.length) / 2);
        for (let j = 0; i + j < m; j++) {
            [matrix[i + j][matrix.length - 1 - j], matrix[matrix.length - 1 - j][i + j]] = [matrix[matrix.length - 1 - j][i + j], matrix[i + j][matrix.length - 1 - j]];
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length / 2; j++) {
            [matrix[i][j], matrix[i][matrix[i].length - j - 1]] = [matrix[i][matrix[i].length - j - 1], matrix[i][j]];
        }
    }
};

const shrinkArray = function (matrix) {
    const newMatrix = [];
    for (let i = 1; i < matrix.length - 1; i++) {
        newMatrix.push(matrix[i].slice(1, matrix[i].length - 1));
    }
    return newMatrix;
};

function characterCount(input) {
    return input.reduce((acc, cur) => {
        return (
            acc +
            cur.split("").reduce((a, c) => {
                if (c === "#") a++;
                return a;
            }, 0)
        );
    }, 0);
}

console.log("--- Day 20: Jurassic Jigsaw ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + oldMonsterInputs(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + monsterInputs(input).toString().cyan + "\n");
