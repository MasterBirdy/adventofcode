# Day 6 🎄

Link to problem: [here](https://adventofcode.com/2020/day/6)

The first problem gives us the responses that everyone in airplane groups marked. The forms are 26 yes-or-no questions, and if they responded yes, they simply wrote the letter of the question. For example, we can take a look at this response:

    abcx
    abcy
    abcz

There are three people in this form response, as desginated by the number of lines. All three people answered yes to questions a, b, and c. However, the first person said yes to x, the second person said yes to y, and the third person said yes to z.

For the first problem, we are asked to calculate the number of questions in a group where at least one person said yes to. We can do this by parsing each of the person's responses, and using a dictionary to keep track of all the questions that were answered yes to. We can add this sum together to get our answer.

The second problem asks us to find the questions where **every** person said yes to instead of just one. For this, we can start to create a dictionary of responses for the first person just like we did in the first part. However, as we compare the answers for each person, we can filter out the keys in which not everyone said yes to. Just like before, we can sum this together to get our answer.
