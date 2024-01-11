/*
在8×8格的国际象棋上摆放8个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法
(1) ["(2,1)", "(4,2)", "(6,3)","(8,4)","(3,5)", "(1,6)", "(7,7)","(5,8)"] -> return true
(2) ["(2,1)", "(4,3)", "(6,3)","(8,4)","(3,4)", "(1,6)", "(7,7)","(5,8)"] -> return (2,1)
(3) ["(2,1)", "(5,3)", "(6,3)","(8,4)","(3,4)", "(1,8)", "(7,7)","(5,8)"] -> return (5,3)
return first queen that is attacking another piece in the same format it was provided
       (1)         |        (2)          |        (3)
x x x x x o x x    |  x x x x x o x x    |  x x x x x x x o
o x x x x x x x    |  o x x x x x x x  v |  o x x x x x x x
x x x x o x x x    |  x x x o x x x x    |  x x x o x x x x
x o x x x x x x    |  x x o x x x x x    |  x x x x x x x x
x x x x x x x o    |  x x x x x x x o    |  x x o x x x x o  v
x x o x x x x x    |  x x o x x x x x    |  x x o x x x x x
x x x x x x o x    |  x x x x x x o x    |  x x x x x x o x
x x x o x x x x    |  x x x o x x x x    |  x x x o x x x x

*/

function EightQueens(str){
    //convert string input to an array of coordinates
    const queens = str.map((coord) => {
        const x = parseInt(coord[1]);
        const y = parseInt(coord[3]);
        return [x, y];
    });
    //check if any queens are attacking each other
    for(let i=0;i<queens.length;i++) {
        for(let j=i+1;j<queens.length;j++) {
            const q1 = queens[i];
            const q2 = queens[j];
            if(q1.x === q2.x && q1.y === q2.y && Math.abs(q1.x-q2.x) === Math.abs(q1.y-q2.y)) {
                return `(${q1.x},${q1.y})
            }
        }
    }
    return true;
}
