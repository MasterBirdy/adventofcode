# Day 1 🎄

Link to problem: [here](https://adventofcode.com/2020/day/1)

This is a variation of the popular Leetcode problem, [Two Sum](https://leetcode.com/problems/two-sum/). We must simply find two numbers in the input list that equals the sum, 2020. This can be solved in O(n) by creating a dictionary of all the input values. Then, we simply have to iterate through all the values in the dictionary to see if it has a number pair which matches 2020.

Part 2 forces us to find three numbers that sum up to 2020 instead of two. One technique we can use to avoid brute force is to sort all the numbers by increasing order. Then, we can iterate through the sorted values by using a two pointers technique.

First, we set an anchor point which is the lowest value. Then, we can set a "low" pointer which points at the next lowest value, and a "high" pointer which points at the highest value. If the sum of the anchor, low, and high pointer is negative, we can decrease the high pointer. If it is postive, we can increase the low pointer. If it is equal to 2020, that means we found our three numbers. We can continue to iterate through the list using this technique to find it in O(n²) time.
