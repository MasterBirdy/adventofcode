const { input, input2 } = require("./input");
const colors = require("colors");
const regex = /[0-9]+-[0-9]+/g;

const invalidTicket = (input, input2) => {
    const groups = [];
    const stack = input.reduce((acc, cur) => {
        const found = cur.match(regex);
        const group = [];
        found.forEach((m) => {
            const numbers = m.split("-");
            const pair = [parseInt(numbers[0]), parseInt(numbers[1])];
            acc.push(pair);
            group.push(pair);
        });
        groups.push(group);
        return acc;
    }, []);

    stack.sort((a, b) => a[0] - b[0]);

    const merged = [stack.shift()];
    while (stack.length) {
        const next = stack.shift();
        const last = merged[merged.length - 1];
        if (last[0] <= next[1] && next[0] <= last[1]) {
            last[0] = Math.min(next[0], last[0]);
            last[1] = Math.max(next[1], last[1]);
        } else {
            merged.push(next);
        }
    }

    const [min, max] = merged[0];

    return input2.reduce((acc, cur) => {
        const numArray = cur.split(",").map((n) => parseInt(n));
        const sum = numArray.reduce((a, c) => {
            let value = parseInt(c);
            if (value >= max || value <= min) {
                return a + c;
            }
            return a;
        }, 0);
        return acc + sum;
    }, 0);
};

const matchAll = (input, input2) => {
    const groups = [];

    const stack = input.reduce((acc, cur) => {
        const found = cur.match(regex);
        const group = [];
        found.forEach((m) => {
            const numbers = m.split("-");
            const pair = [parseInt(numbers[0]), parseInt(numbers[1])];
            acc.push(pair);
            group.push(pair);
        });
        groups.push(group);
        return acc;
    }, []);

    stack.sort((a, b) => a[0] - b[0]);

    const merged = [stack.shift()];
    while (stack.length) {
        const next = stack.shift();
        const last = merged[merged.length - 1];
        if (last[0] <= next[1] && next[0] <= last[1]) {
            last[0] = Math.min(next[0], last[0]);
            last[1] = Math.max(next[1], last[1]);
        } else {
            merged.push(next);
        }
    }

    const [min, max] = merged[0];

    const filteredTickets = input2.filter((ticket) => {
        const numArray = ticket.split(",").map((n) => parseInt(n));
        for (let i = 0; i < numArray.length; i++) {
            if (numArray[i] < min || max < numArray[i]) {
                return false;
            }
        }
        return true;
    });

    let groupsCounter = [];

    for (let i = 0; i < groups.length; i++) {
        groupsCounter.push(new Array(groups.length).fill(0));
    }

    filteredTickets.forEach((ticket) => {
        const ticketArray = ticket.split(",").map((m) => parseInt(m));
        ticketArray.forEach((num, ticketPos) => {
            groups.forEach((pairs, index) => {
                if (pairs.some((pair) => pair[0] <= num && num <= pair[1])) {
                    groupsCounter[index][ticketPos]++;
                }
            });
        });
    });

    const counterObject = {};

    for (let i = 0; i < groups.length; i++) {
        counterObject[i] = [];
    }

    groupsCounter.forEach((group, groupIndex) => {
        group.forEach((num, index) => {
            if (num === 190) {
                // if (
                //     index !== 6 &&
                //     index !== 13 &&
                //     index !== 18 &&
                //     index !== 8 &&
                //     index !== 14 &&
                //     index !== 17 &&
                //     index !== 0 &&
                //     index !== 12 &&
                //     index !== 16 &&
                //     index !== 2 &&
                //     index !== 5 &&
                //     index !== 11
                // ) {
                counterObject[groupIndex].push(index);
                // }
            }
        });
    });

    // console.log(counterObject);
};

function calculateMyTicket(ticket) {
    const ticketArr = ticket.split(",").map((n) => parseInt(n));
    return ticketArr[5] * ticketArr[2] * ticketArr[15] * ticketArr[1] * ticketArr[19] * ticketArr[11];
}

console.log("--- Day 16: Ticket Translation ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + invalidTicket(input, input2).toString().cyan + "\n");

// method to calculate ticket
// matchAll(input, input2);

console.log("PART 2:".yellow.bold);

const myTicket = "191,89,73,139,71,103,109,53,97,179,59,67,79,101,113,157,61,107,181,137";

console.log("ANSWER\n".bold + calculateMyTicket(myTicket).toString().cyan + "\n");
