/*
234 --> 15, because: productDigit 234 = 24, sum 2+3+4 = 9, result 24-9 = 15
*/
function ProductDigits(n) {
    //turn digit into string
    let num = n.toString();
    let product = 1;
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
         //grab digit, turn it back into number
         let number = parseInt(num[i]);
         product *= number;
         sum += number;
      }
     return product - sum;
}
