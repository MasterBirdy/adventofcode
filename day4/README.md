# Day 4 🎄

Link to problem: [here](https://adventofcode.com/2020/day/4)

The first part asks us to validate passports by making sure each passport has all the required fields. This can be done by mapping all the fields that each passport has to a dictionary, making a list of all the required fields, and going through each of them to make sure they exist in the dicitonary. If they do, it is a valid passport.

The second part has us also validate the field inputs with simple rules. For example, for the birth year, it must be at least 1920 and at most 2002. Most of this can be done by associating simple methods to each of the fields that return boolean values to determine the validity of the field input.
