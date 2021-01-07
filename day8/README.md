# Day 8 🎄

Link to problem: [here](https://adventofcode.com/2020/day/8)

This problem asks us to go through some boot code and determine where there is an infinite loop. There are three types of commands in the boot code.

-   acc: increases or decreases a global value called the accumulator. For example, acc + 7 would increase the accumulator by 7. The accumulator initially starts at 0. After an acc instruction, the next line is executed.
-   jmp: jumps to a new line of code relative to itself. For example, jmp + 2 would skip to the instruction two lines below it, jmp + 1 would simply go to the next instruction, and jmp - 20 would move back 20 lines and execute that line of code.
-   nop: stands for No Operation. It does nothing, and moves to the next line of code.

In the first part, we simply just need to keep track of the accumulator and all the lines of code that we visited in a dictionary. When we reach a line of code that we already visited, we can simply report the value of the accumulator.

The second part asks us to change exactly one command from a jmp command to a nop command, or a nop command to a jmp command. Since there is no obvious way of determining which jmp and nop command should be changed, we can explore all possibilities using recursion. The base cases will be if our position is exactly the last line, which returns a truthy value (our accumulator value), or if its either a position we already visited or if our position extends past the last line, which returns a falsy value. If we haven't changed a command yet, we can split our function into two recursive calls to find out which one returns a truthy value. Else, we can proceed with the the boot code as normal.
