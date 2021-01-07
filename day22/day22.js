const colors = require("colors");

const crabCombat = (deck1, deck2) => {
    const playerDeck1 = [...deck1];
    const playerDeck2 = [...deck2];
    let round = 0;
    while (playerDeck1.length && playerDeck2.length) {
        round++;
        const playerCard1 = playerDeck1.shift();
        const playerCard2 = playerDeck2.shift();
        if (playerCard1 > playerCard2) {
            playerDeck1.push(playerCard1, playerCard2);
        } else {
            playerDeck2.push(playerCard2, playerCard1);
        }
    }

    const winningDeck = playerDeck1.length ? playerDeck1 : playerDeck2;
    return winningDeck.reduce((acc, cur, index) => acc + cur * (winningDeck.length - index), 0);
};

const recursiveCrabCombat = (deck1, deck2, initial = false) => {
    let round = 0;
    let combinations = {};
    while (deck1.length && deck2.length) {
        round++;
        const key = `1:${deck1.toString()}-2:${deck2.toString()}`;
        if (combinations[key]) {
            return true;
        } else {
            combinations[key] = true;
        }
        const playerCard1 = deck1.shift();
        const playerCard2 = deck2.shift();
        if (playerCard1 <= deck1.length && playerCard2 <= deck2.length) {
            const didPlayerOneWin = recursiveCrabCombat(deck1.slice(0, playerCard1), deck2.slice(0, playerCard2));
            if (didPlayerOneWin) {
                deck1.push(playerCard1, playerCard2);
            } else {
                deck2.push(playerCard2, playerCard1);
            }
        } else {
            if (playerCard1 > playerCard2) {
                deck1.push(playerCard1, playerCard2);
            } else {
                deck2.push(playerCard2, playerCard1);
            }
        }
    }
    if (initial) {
        const winningDeck = deck1.length ? deck1 : deck2;
        return winningDeck.reduce((acc, cur, index) => acc + cur * (winningDeck.length - index), 0);
    }
    return !!deck1.length;
};

const playerDeck1 = [31, 33, 27, 43, 29, 25, 36, 11, 15, 5, 14, 34, 7, 18, 26, 41, 19, 45, 12, 1, 8, 35, 44, 30, 50];
const playerDeck2 = [42, 40, 6, 17, 3, 16, 22, 23, 32, 21, 24, 46, 49, 48, 38, 47, 13, 9, 39, 20, 10, 2, 37, 28, 4];

console.log("--- Day 22: Crab Combat ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + crabCombat(playerDeck1, playerDeck2).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + recursiveCrabCombat(playerDeck1, playerDeck2, true).toString().cyan + "\n");
