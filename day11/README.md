# Day 11 🎄

Link to problem: [here](https://adventofcode.com/2020/day/11)

This problem is sorta similar to Conway's Game of Life in that it shows us a seat layout grid in which people will either sit in a seat or leave it. To determine if a seat changes, we take a look at the eight adjacent seats around it. The rules are as follows:

-   if a seat is empty ("L") and there are no occupied seats adjacent to it, the seat becomes occupied.
-   if a seat is occupied ("#") and four or more seats adjacent to it are occupied, the seat becomes empty.
-   else, nothing happens to it.

It asks us to run this simulation until no seats change and the seating system stabilizes. To my knowledge, since we can't tell when the simulation will end, the best way to implement this is to change the state each time until we find a state where nothing changes.

The second part is similar, except some of the rules have changed:

-   instead of looking at the eight adjacent seats, we must consider the first seat in the eight directions. So, we must keep looking for a seat until either we reach the end of the map, or we find an occupied/unoccupied seat.
-   instead of four seats adjacent to an occupied seat, now it must be five or more.

We can implement this in a similar way to Part 1, where we check the state during each change and see if any changes have been made.
