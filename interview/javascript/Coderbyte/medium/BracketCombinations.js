/*
Have the function BracketCombinations(num) read num which will be an integer greater than or equal to zero, 
and return the number of valid combinations that can be formed with num pairs of parentheses. For example, 
if the input is 3, then the possible combinations of 3 pairs of parenthesis, 
namely: ()()(), are ()()(), ()(()), (())(), ((())), and (()()). 
here are 5 total combinations when the input is 3, so your program should return 5
*/

function BracketCombinations(num) { 
  return (f(2 * num)) / ((f(num + 1)) * (f(num)));
}

const f = (num) => {
  if (num === 0 || num === 1)
    return 1;
  for (let i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}
