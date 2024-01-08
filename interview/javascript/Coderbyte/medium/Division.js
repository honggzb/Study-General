/*Using the JavaScript language, have the function Division(num1,num2)
take both parameters being passed and return the Greatest Common Factor.
That is, return the greatest number that evenly goes into both numbers with no remainder. 
For example: 12 and 16 both are divisible
by 1, 2, and 4 so the output should be 4. The range for both parameters will be from 1 to 10^3.

return greatest common factor
12, 16 --> 4, both are divisible by 1,2,4
7, 2 --> 1
36, 54 --> 18

*/

function Division(num1,num2) { 
  for(var i=num1; i>0; i--){
    if(num1%i==0 && num2%i==0){
      return i;
    }
  }
}

/********************************************************/
function Division(num1, num2) {
    var highest = 0;
    var limit = Math.min(num1, num2);
    if(num1 === 1 && num2 === 1) return 1;
    for(let i=1;i<=limit;i++) {
        if(num1 % i === 0 && num2 % i === 0) {
            highest = i;
        }
    }
    return highest;
}
