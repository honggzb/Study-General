/*Using the JavaScript language, have the function FibonacciChecker(num) return the string yes if the number
given is part of the Fibonacci sequence. This sequence is defined by: Fn = Fn-1 + Fn-2, 
which means to find Fn you add the previous two numbers up.
The first two numbers are 0 and 1, then comes 1, 2, 3, 5 etc. If num is not in the Fibonacci
sequence, return the string no. */

return the string yes if the number given is part of the Fibonacci sequence
0 1 2 3 5
************************************************************************************************************/
  
function FibonacciChecker(num) {
// Initialize an array with the first value of the Fibonacci sequence
  var prev = [0]
  // Loop through each number in the sequence up to and including the input number
  for (i = 1; i < num+1; i) {
    // Calculate the next number in the sequence by adding the previous two
    var check = i + prev[0]
    // If the calculated number is equal to the input number, return "yes"
    if (check === num) {
      return 'yes'
    }
    // Add the current number to the beginning of the array to keep track of the previous two numbers
    prev.unshift(i)
    // Update the current number to be the next number in the sequence
    i = check
  }
  // If the input number is not in the Fibonacci sequence, return "no"
  return 'no' 
}

/************************************************************************************************************/

function FibonacciChecker(num) { 
  if(num===2||num===3){
    return "yes";
  }
   var num1=0;
    var num2=1;
    var num3=1;
  for(var i=0; i<=num; i++){
      if(num1===num){return "yes";}
        num1 = num2;
        num2 = num3;
        num3 = num1+num2;
      }
  return "no";
         
}
