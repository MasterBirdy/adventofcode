const input = require("./input");
const colors = require("colors");

function main(input, additionValue = 1) {
    const operants = {
        "+": additionValue,
        "*": 1,
        "(": 99,
        ")": 99,
    };

    return input.reduce((acc, cur) => acc + solveMath(infixToPostFix(cur)), 0);

    function solveMath(input) {
        const stack = [];
        for (let i = 0; i < input.length; i++) {
            if (operants[input[i]]) {
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                stack.push(applyOperant(operand1, operand2, input[i]));
            } else {
                stack.push(parseInt(input[i]));
            }
        }

        return stack[0];

        function applyOperant(operand1, operand2, symbol) {
            if (symbol === "+") {
                return operand1 + operand2;
            } else if (symbol == "*") {
                return operand1 * operand2;
            }
            return -1;
        }
    }

    function infixToPostFix(equation) {
        const equationParser = equation.replace(/\(/g, "( ").replace(/\)/g, " )").split(" ");
        let postfixEquation = "";
        const stack = [];

        for (let i = 0; i < equationParser.length; i++) {
            if (equationParser[i] in operants) {
                operantSolver(equationParser[i]);
            } else {
                postfixEquation += equationParser[i];
            }
        }

        while (stack.length) {
            postfixEquation += stack.pop();
        }

        return postfixEquation;

        function operantSolver(symbol) {
            if (stack.length) {
                if (symbol === "(") {
                    stack.push(symbol);
                } else if (symbol === ")") {
                    flush();
                    stack.pop();
                } else if (operants[symbol] <= operants[stack[stack.length - 1]]) {
                    flushOperant(symbol);
                    stack.push(symbol);
                } else {
                    stack.push(symbol);
                }
            } else {
                stack.push(symbol);
            }

            function flush() {
                while (stack.length && stack[stack.length - 1] !== "(") {
                    postfixEquation += stack.pop();
                }
            }

            function flushOperant(sym) {
                while (stack.length && stack[stack.length - 1] !== "(" && operants[stack[stack.length - 1]] >= operants[sym]) {
                    postfixEquation += stack.pop();
                }
            }
        }
    }
}

console.log("--- Day 18: Operation Order ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + main(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + main(input, 2).toString().cyan + "\n");
