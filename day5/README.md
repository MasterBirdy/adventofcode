# Day 5 🎄

Link to problem: [here](https://adventofcode.com/2020/day/5)

The first problem asks us to find the seat with the highest boarding pass ID. The airline uses a binary space partitioning system to seat people. For example, a seat may be specified as "FBFBBFFRLR". For the F/B section of the code, there are 128 rows to consider. The first F would mean to take the lower half of rows, so from 0 - 63. The next B would mean to take the upper half from that partition, so from 32-63. We continue this method until we get to the row number. We then use the L/R section of the code to determine the column number. In the example above, R would mean to take the upper half of columns, and L would mean to take the lower half of columns. So, the example would be row 44, column 5. We then multiply the row by 8 and add the columns to get the seat ID.

44 \* 8 + 5 = 357.

What we can notice is if we translate the seat code to binary numbers (F = 1, B = 0, R = 1, L = 0), we can find all the rows and columns of each seat pretty efficiently. So, FBFBBFF translates to 0101100, which is 44. And, RLR translates to 101, which is 5.

The second part asks us to find our seat, which should be the only missing seat in the plane. However, some of the front seats and back seats don't exist, so they're missing from the input. We can simply use a dictionary to record all the seats, and then list all the empty seats to find one that isn't close to the front or back.
