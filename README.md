# independent-studies-river-crossing-animation
River Crossing Problem Simulation using Web Animations API

# Weekly Tasks
1. Add River Crossing Solver codes into application (Done!)
2. Create function to get start animals and end positions, get element based of HTML ID, and call respective moves? (Done!)
3. Consider how to handle situations where 1 animal moving vs 2 animal moving (Done!)
4. Consider order of program (Done!)
-> Click button, generate number of goats and lions
-> Call solver and receive results
-> Calculate Goat and Lion moved for first move, call function to get animal and position
-> Call move functions (Will need to chain promises together? Finish 1 set of animation, do calculations, start next animation?)

Better to have function to do 1 step at a time

-> Looking forward into playback, would be good to keep array of steps
-> User can skip or reverse to previous step
-> This way, program will always know what comes next

Need to change IS1 codes? Return an array of the corresponding moves?
OR, find out how to find the corresponding moves from the IS1 program results

Found!
From final results, take deduct to find the animals move.
If current is L, calculate for first two numbers, if R, calculate for last two
E.g. 
L5400 -> R4311 (5 - 4 = 1 Goat Moved, 4 - 3 = 1 Lion Moved)
R4311 -> L5301 (1 - 0 = 1 Goat Moved, 1 - 1 = 0 Lion Moved)