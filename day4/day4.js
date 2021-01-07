const input = require("./input");
const colors = require("colors");

const countValid = (input, part2) => {
    const requiredKeys = {
        byr: (year) => parseInt(year) >= 1920 && parseInt(year) <= 2002,
        iyr: (year) => parseInt(year) >= 2010 && parseInt(year) <= 2020,
        eyr: (year) => parseInt(year) >= 2020 && parseInt(year) <= 2030,
        hgt: (measure) => {
            const measureRegex = /^[0-9]+cm|[0-9]+in$/;
            if (measureRegex.test(measure)) {
                let number = measure.match(/[0-9]+/);
                let measurement = measure.match(/[a-z]+/);
                if (number && number[0]) {
                    if (measurement && measurement[0] === "cm") {
                        return parseInt(number[0]) >= 150 && parseInt(number[0]) <= 193;
                    } else if (measurement && measurement[0] === "in") {
                        return parseInt(number[0]) >= 59 && parseInt(number[0]) <= 76;
                    }
                }
            }
            return false;
        },
        hcl: (color) => /^#[0-9a-f]{6}$/.test(color),
        ecl: (color) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some((eye) => eye === color),
        pid: (number) => /^[0-9]{9}$/.test(number),
    };
    const mappedInputs = input.map((passport) => {
        return passport.split(" ").reduce((acc, cur) => {
            [key, value] = cur.split(":");
            acc[key] = value;
            return acc;
        }, {});
    });

    if (part2) {
        return mappedInputs.reduce((acc, cur) => {
            if (Object.keys(requiredKeys).every((key) => cur[key] && requiredKeys[key](cur[key]))) {
                acc++;
            }
            return acc;
        }, 0);
    }

    return mappedInputs.reduce((acc, cur) => {
        if (Object.keys(requiredKeys).every((key) => cur[key])) {
            acc++;
        }
        return acc;
    }, 0);
};

console.log("--- Day 4: Passport Processing ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + countValid(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + countValid(input, true).toString().cyan + "\n");
