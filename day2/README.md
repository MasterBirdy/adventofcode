# Day 2 🎄

Link to problem: [here](https://adventofcode.com/2020/day/2)

The first part asks to validate each password by seeing if it contains a minimum and maximum amount of a certain character. The most straightforward solution for me is to create a simple regex expression that matches all the times it finds a character in the password. So, if it was searching for the character "a", the regex expression would be /a/g.

The second part changes the numbers to mean that a password may only contain a character at one of these positions. We simply just need to compare the characters at the positions for each password to see whether it is a valid password or not.
