# Day 9 🎄

Link to problem: [here](https://adventofcode.com/2020/day/9)

This problem asks us, starting at position 25, to go through the last 25 numbers to check and see if the sum of two previous numbers add up to the current iterated number.

This can be done using a two pointer method to search and see if two values exist that equal up to the sum of the new number. Admittedly, this could also be done using a dictionary which iterates through each of the past 25 numbers to see if a number exists that adds up to the current new number. If no value exists, then it reports that number as the answer.

For the second part, we must find a contiguous set of at least two numbers that adds up to the number that we found in part one. This can be solved in a fairly straightforward way using a two pointer method as well, where we set a pointer at index zero and a pointer at index one. If the sum is too low for our goal, we move our second pointer up, and if it's too low, we move our first pointer up.
