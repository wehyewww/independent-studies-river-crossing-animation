# independent-studies-river-crossing-animation
River Crossing Problem Simulation using Web Animations API

# Weekly Tasks
1. Change start and end positions to be generalised (animal1-start, animal2-start, animal1-end, animal2-end) (Done!)
2. Think of how to move animals

Create 2 arrays? For each side? (Done!)

Loop through to see if there is a goat or lion occupying the space? (If want to find start animal to move) (Done!)
If found animal, get position and move

Loop through to find next empty space (If want to find end position for animal to move to) (Done!)
If found empty space, get position and move

Need to change IS1 codes? Return an array of the corresponding moves?
OR, find out how to find the corresponding moves from the IS1 program results

Found!
From final results, take deduct to find the animals move.
If current is L, calculate for first two numbers, if R, calculate for last two
E.g. 
L5400 -> R4311 (5 - 4 = 1 Goat Moved, 4 - 3 = 1 Lion Moved)
R4311 -> L5301 (1 - 0 = 1 Goat Moved, 1 - 1 = 0 Lion Moved)