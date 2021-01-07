# Day 10 🎄

Link to problem: [here](https://adventofcode.com/2020/day/10)

This problem gives us a bunch of charge adapters with different volt ratings. To connect a charger to another, it must not have a difference more than 3 volts. In the first part, it wants to create a chain using all the adapters and find the difference between each charge adapter. This can be simply done by creating a dictionary of 1-volt, 2-volt, and 3-volt charges. We can then just multiply the 1-volt charge count and the 3-volt charge count to get the answer.

The second part asks us to find the count of all the possible combinations of volt chargers. This requires some recursion to go through all possibilities. The bases cases are if the number is the last position of the index, which it returns 1, or if it extends past the last position, which it returns 0. We can use memoization to reduce the number of calls that we make to O(n). After completing all the recursive calls, we can simply return the memorized call for the zero position (the start of the list).
