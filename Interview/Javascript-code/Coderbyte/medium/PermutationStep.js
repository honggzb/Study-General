/*
return the next number greater than num using the same digits
11121 -> 11211
41352 --> 41523
*/

function PermutationStep(num) {
    var arr = num.toString().split("");
    var x = arr.length, a, b, temp;
    for(var i=x-1;i>=0;i--) {
        a = arr[i];
        b = arr[i-1];
        // if current digit is greater than previous digit
        if(a>b) {
            arr[i] = b;
            arr[i-1] = a;
            //cut the remaining part starting from index i to the end
            temp = arr.splice(i, x-1).sort();
            return arr.concat(temp).join('');
        }
    }
    return -1;
}
