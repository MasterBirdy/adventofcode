const colors = require("colors");

const crabCups = (input, firstMove) => {
    let currentArray = input;
    let currentCup = null;
    for (let i = 0; i < 100; i++) {
        let tempArray = [...currentArray];
        if (!currentCup) {
            currentCup = firstMove;
        }
        let currentCupPosition = tempArray.findIndex((val) => val === currentCup);
        let pickedUpPositions = [1, 2, 3].map((pos) => mod(currentCupPosition + pos, tempArray.length));
        let pickedUpValues = pickedUpPositions.map((pos) => tempArray[pos]);
        pickedUpPositions.sort((a, b) => b - a).forEach((pos) => tempArray.splice(pos, 1));
        let tempCurrentCup = currentCup;
        let destinationCupPosition = null;
        while (destinationCupPosition === null) {
            tempCurrentCup--;
            if (tempCurrentCup <= 0) {
                tempCurrentCup = 9;
            }
            if (pickedUpValues.findIndex((val) => val === tempCurrentCup) !== -1) {
                continue;
            }
            destinationCupPosition = tempArray.findIndex((val) => val === tempCurrentCup);
        }
        tempArray.splice(destinationCupPosition + 1, 0, ...pickedUpValues);
        currentCup = tempArray[mod(tempArray.findIndex((val) => val === currentCup) + 1, tempArray.length)];
        currentArray = tempArray;
    }
    return currentArray.toString();
};

function mod(n, m) {
    return ((n % m) + m) % m;
}

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

const linkedCrabCups = (input) => {
    const dict = {};
    let currentNode = null;
    input.forEach((val) => {
        const newNode = new Node(val);
        dict[val] = newNode;
        if (currentNode) {
            newNode.prev = currentNode;
            currentNode.next = newNode;
        }
        currentNode = newNode;
    });
    currentNode.next = dict[input[0]];
    dict[input[0]].prev = currentNode;
    let currentCup = null;
    for (let i = 0; i < 10000000; i++) {
        if (!currentCup) {
            currentCup = input[0];
        }
        let pickedUpValues = [];
        let iterator = dict[currentCup];
        iterator.next.prev = null;
        for (let j = 0; j < 3; j++) {
            iterator = iterator.next;
            pickedUpValues.push(iterator.val);
        }
        let tempNode = iterator.next;
        iterator.next = null;
        dict[currentCup].next = tempNode;
        tempNode.prev = dict[currentCup];
        let tempDestinationCup = currentCup;
        while (tempDestinationCup === currentCup || pickedUpValues.some((val) => val === tempDestinationCup)) {
            tempDestinationCup--;
            if (tempDestinationCup <= 0) {
                tempDestinationCup = input.length;
            }
        }
        const destinationCupNext = dict[tempDestinationCup].next;
        dict[tempDestinationCup].next = dict[pickedUpValues[0]];
        dict[pickedUpValues[0]].prev = dict[tempDestinationCup];
        dict[pickedUpValues[2]].next = destinationCupNext;
        destinationCupNext.prev = dict[pickedUpValues[2]];
        currentCup = dict[currentCup].next.val;
    }

    let val1 = BigInt(dict[1].next.val);
    let val2 = BigInt(dict[1].next.next.val);

    return val1 * val2;
};

const testInput = [6, 2, 4, 3, 9, 7, 1, 5, 8];

function range(start, end) {
    return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
}

const fillerArray = [...testInput, ...range(10, 1000000)];

console.log("--- Day 23: Crab Cups ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + crabCups(testInput).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + linkedCrabCups(fillerArray).toString().cyan + "\n");
