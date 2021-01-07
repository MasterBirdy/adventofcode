const { input, checked } = require("./input");
const colors = require("colors");

const aOrBRegex = /(a|b)/g;

function monsterMessages(input, checked, first = true) {
    const dict = {};
    input.forEach((line) => {
        const key = line.match(/[0-9]+/g)[0];
        const restOfLine = line.slice(key.length + 2);
        if (aOrBRegex.test(restOfLine)) {
            dict[key] = restOfLine.match(aOrBRegex)[0];
        } else {
            const groups = restOfLine.split("|");
            const returnedGroups = groups.map((group) => group.trim().split(" "));
            dict[key] = returnedGroups;
        }
    });

    const memo = {};
    const regex = new RegExp(`^${first ? oldRegexHelper("0") : regexHelper("0")}$`, "g");

    return checked.reduce((acc, cur) => {
        if (cur.search(regex) !== -1) {
            acc++;
        }
        return acc;
    }, 0);

    function oldRegexHelper(key) {
        if (!Array.isArray(dict[key])) return dict[key];
        if (key in memo) return memo[key];
        let answer = "";

        answer = "(";
        for (let i = 0; i < dict[key].length; i++) {
            if (i) {
                answer += "|";
            }
            dict[key][i].forEach((rule) => {
                answer += oldRegexHelper(rule);
            });
        }
        answer += ")";

        memo[key] = answer;
        return answer;
    }

    function regexHelper(key) {
        if (!Array.isArray(dict[key])) return dict[key];
        if (key in memo) return memo[key];
        let answer = "";
        if (key === "8") {
            answer = `(${regexHelper("42")})+`;
        } else if (key === "11") {
            answer = `((${regexHelper("42")}){1}(${regexHelper("31")}){1}|(${regexHelper("42")}){2}(${regexHelper("31")}){2}|(${regexHelper("42")}){3}(${regexHelper("31")}){3}|(${regexHelper(
                "42"
            )}){4}(${regexHelper("31")}){4}|(${regexHelper("42")}){5}(${regexHelper("31")}){5}|(${regexHelper("42")}){6}(${regexHelper("31")}){6})`;
        } else {
            answer = "(";
            for (let i = 0; i < dict[key].length; i++) {
                if (i) {
                    answer += "|";
                }
                dict[key][i].forEach((rule) => {
                    answer += regexHelper(rule);
                });
            }
            answer += ")";
        }
        memo[key] = answer;
        return answer;
    }
}

console.log("--- Day 19: Monster Messages ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + monsterMessages(input, checked).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + monsterMessages(input, checked, false).toString().cyan + "\n");
