/*
fill a 9x9 matrix with digits so that each column, each row, and all 9 non-overlapping 3x3 sub-matrices contain all of the digits from 1 through 9

["(1,2,3,4,5,6,7,8,1)", "(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(1,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)"] => 1,3,4

1 2 3 4 5 6 7 8 1    |  1 2 3 4 5 6 7 8 9 
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  6 x 5 x 3 x x 4 x
1 x x x x x x x x    |  2 x 1 1 x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x 9
1,3,4                |  3,4,5,9

*/

function SudokuQuadrantChecker(str) {
    let board = str.map(row => row.substr(1, row.length-2).split(','));
    let errors = {};
    for(let row=0;row<board.length;row++) {
        for(let col=0;col<board[0].length;col++) {
            //ignore empty cell represented by 'x'
            if(board[row][col] === 'x') continue; 
            //caculate current quadrant number
            let quadrant = Math.floor(row /3) * 3 + Math.floor(col/3) + 1;
            //check errors in current row
            for(let i=0;i<board.length;i++) {
                if(i !== col) {   //not testing itself
                    if(board[row][i] === board[row][col]) {
                        errors[quadrant] = 1;
                    }
                }
            }
            //check for errors in the current column
            for(let i=0;i<board[0].length;i++) {
                if(i !== row) {   //not testing itself
                    if(board[i][col] === board[row][col]) {
                        errors[quadrant] = 1;
                    }
                }
            }
            //check for errors in the current 3x3 box
            for(let r=0;r<3;r++) {
                for(let c=0;c<3;c++) {
                    let rowQuadrant = Math.floor(row/3);
                    let colQuadrant = Math.floor(col/3);
                    if(board[row][col] === board[rowQuadrant*3 + r][colQuadrant*3 +c]) {
                        if(row !== rowQuadrant*3 + r && col !== colQuadrant*3 + c) {
                            errors[quadrant] = 1;
                        }
                    }
                }
            }
        }
    }
    if(Object.keys(errors).length === 0) {
        return 'legal';
    }
    return Object.keys(errors).join(',');
}
