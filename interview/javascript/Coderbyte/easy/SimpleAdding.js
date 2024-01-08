/*
QUESTION:
Have the function SimpleAdding(num) add up all the numbers from 1 to num. 
For example: if the input is 4 then your program should return 10 because 1 + 2 + 3 + 4 = 10. For the test cases, the parameter num will be any number from 1 to 1000. 
*/

function SimpleAdding(num) {
    return parseInt(num*(num+1)/2); //in case of floating point
}

/***************************************************************************************
*                                                                                      *
*                  CODERBYTE BEGINNER CHALLENGE                                        *
*                                                                                      *
*  Simple Adding                                                                       *
*  Using the JavaScript language, have the function SimpleAdding(num) add up all the   *
*  numbers from 1 to num. For the test cases, the parameter num will be any number     *
*  from 1 to 1000.                                                                     *
*                                                                                      *
*  SOLUTION                                                                            *
*  This is a simple iterative function that add each number in sequence.               *
*                                                                                      *
*  Steps for solution                                                                  *
*    1) Set var tot to 0.                                                              *
*    2) Loop from 1 to num and add i by tot to get new tot.                            *
*    3) Return tot for answer.                                                         *
*                                                                                      *
***************************************************************************************/


/***************************************************************************************
*                                                                                      *
*                  CODERBYTE BEGINNER CHALLENGE                                        *
*                                                                                      *
*  Simple Adding                                                                       *
*  Using the JavaScript language, have the function SimpleAdding(num) add up all the   *
*  numbers from 1 to num. For the test cases, the parameter num will be any number     *
*  from 1 to 1000.                                                                     *
*                                                                                      *
*  SOLUTION                                                                            *
*  This is a simple iterative function that add each number in sequence.               *
*                                                                                      *
*  Steps for solution                                                                  *
*    1) Set var tot to 0.                                                              *
*    2) Loop from 1 to num and add i by tot to get new tot.                            *
*    3) Return tot for answer.                                                         *
*                                                                                      *
***************************************************************************************/

function SimpleAdding(num) { 
  var tot = 0;
  for (var i = 1; i <= num; i++) {
    tot += i;
  }
  return tot;   
}
