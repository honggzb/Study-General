/*
[12, 2, 6, 7, 11] -> 6
[6, 4] -> 4
[8, 1, 8] -> 6
1 2       |  4 is occupied desk
3 [4]     | there are a total 4 ways to seat 2 new students next to each other
5 6       | [1 2], [1 3], [3 5], [5 6]
---------------------------------------------------------------------------------
[1] 2     |
3   4     | [2 4], [3 4], [3 5], [4 6], [5 6], [5 7]
5   6     |
7  [8]    |
*/

function SeatingStudents(arr) {
    const k = arr[0];
    const occupied = new Set(arr.slice(1));
    let count = 0;
    for(let i=1;i<k;i++) {
        if(!occupied.has(i)) {
            // check to the right
            if(i % 2 === 1 && !occupied.has(i+1) && i+1 <=k) {
                count++;
            }
            //check to below
            if(i<k-1 && !occupied.has(i+ 2)) {
                count++
            }
        }
    }
    return count;
}
//
function SeatingStudents(arr) {
    const [numDesks, ...occupiedDesk] = arr;
    let count = 0;
    for(let i=1; i<numDesks; i++) {           
        if(!occupiedDesk.includes(i)) {
             // check to the right
            if(i % 2 === 1 && !occupiedDesk.includes(i+1) && i+1 <= numDesks) {
                count++;
            }
            //check to below
            if(!occupiedDesk.includes(i+2) && i < numDesks -1) {
                count++;
            }
        }
    }
    return count;
}
