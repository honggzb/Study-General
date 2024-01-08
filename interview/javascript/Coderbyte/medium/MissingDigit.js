/*
Have the function MissingDigit(str) take the str parameter, which will be a simple mathematical formula with three numbers, a single operator (+, -, *, or /) and an equal sign (=) and return the digit that completes the equation. In one of the numbers in the equation, there will be an x character, and your program should determine what digit is missing. For example, if str is "3x + 12 = 46" then your program should output 4. The x character can appear in any of the three numbers and all three numbers will be greater than or equal to 0 and less than or equal to 1000000.
"4 - 2 = x" --> 2
"1x0 * 1200" --> 0
https://github.com/koko37/challenge-missing-digits/blob/master/solution.js
*/
function MissingDigit(str) {
    var x = 0;
    // replace 'x' in the input string with the value of 'x'(which is 0)
    var temp = str.replace('x', x);
    var arr = temp.split(' = ');
    while(eval(arr[0]) !== eval(arr[1])) {
        x++;
        //replace 'x' in the input string with updated value of 'x'
        temp = str.replace('x', x);
        arr = temp.split(' = ');
    }
    // return the value of 'x' that completes the equation
    return x;
}
