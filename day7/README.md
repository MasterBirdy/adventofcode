# Day 7 🎄

Link to problem: [here](https://adventofcode.com/2020/day/7)

The first problem gives us a scenario in which bags can contain other bags. An example input may look like this:

    light red bags contain 1 bright white bag, 2 muted yellow bags.
    dark orange bags contain 3 bright white bags, 4 muted yellow bags.
    bright white bags contain 1 shiny gold bag.
    muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
    shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
    dark olive bags contain 3 faded blue bags, 4 dotted black bags.
    vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
    faded blue bags contain no other bags.
    dotted black bags contain no other bags.

From this, we must determine how many colors would be able to hold our shiny gold bag. In this example, it would be 4. The bright white and muted yellow bags hold our shiny gold bag directly. The light red and the the dark orange bags holder either the muted yellow or the bright white bags, which hold our shiny gold bags.

To solve the first part, we can create a dictionary in which the keys are the bags being held and the values is an array of bags that hold that bag. So, in this example, the shiny gold bag would be a key and the muted yellow and bright white would be values for that key. We can use a stack and add these values to the stack to iterate and see what bags hold these bags as well. We can also use a dictionary to track which bags we have iterated through, and simply return the length of that dictionary.

The second part asks us to find how many bags a shiny gold bag can contain. In this example, it would be 32, since a shiny gold contains a dark olive bag, which includes itself and 7 other bags, and 2 vibrant plum bags, which include themselves and 22 other bags. So, the answer would be 1 + 1 \* 7 + 2 + 2 \* 11 = 32.

For the answer, this requires us to do a bit of recursion, where we iterate through each of the bags, and add to the sum the number of bags times the number of the child bags + 1. So, in the example above:

    1 * (7 + 1) + 2 * (11 + 1) = 32

We repeat this process till we run out of bags to iterate through.
