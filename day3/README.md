# Day 3 🎄

Link to problem: [here](https://adventofcode.com/2020/day/3)

The first part gives us a map with trees and asks us if we were riding a toboggan down a hill, how many trees would we run into? We ride down the slope at a rate of 1 down, 3 right. If we go too far right, we simply move ourselves all the way to the left and continue as if the map from left to right was an infinite pattern. Thus, we simply need to track our position iterating through the whole map and count how many trees we crash into.

The second part gives us multiple rates that we are riding our toboggan (such as 1 down, 1 right & 2 down, 1 right). Thus, we just need to iterate through all of these slopes and multiply each of the number of trees we crash into to get our answer.
