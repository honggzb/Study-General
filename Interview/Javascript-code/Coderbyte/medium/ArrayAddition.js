/*
return true if any combination of numbers(excluding the largest number) of arr be added up to equal lagest number
[4,6,23,10,1,3], 4+6+10+1+3=23 --> true
[3,5,-1,8,12], 5-1+8=12 --> true
[5,7,16,1,2] --> false
*/
  
function ArrayAddition(arr) {
    let largest = Math.max(...arr);
    // remove the largest number from the arr
    let index = arr.indexOf(largest);
    arr.splice(index, 1);  // the remaining elements that excludign largest one
    let sum = arr.reduce((acc, val) => acc + val, 0);
    //check if any combination of the remaining numbers can add up to the largest number
    function checkSum(arr, target) {
        if(target === 0) {
            return true;
        }
        if(arr.length === 0) {
            return false;
        }
        let current = arr[0];
        let remaining = arr.slice(1);
        return checkSum(remaining, target) || checkSum(remaining, target - current);
    }
    return checkSum(arr, largest - sum) ? false : true;
}
// good solution
function ArrayAddition(arr) {
    //sort array in ascending order and remove the largest number
    var target = arr.sort(function(a, b){ return a-b}).pop();
    return isContains(arr, target);
    function isContains(arr, target) {
        if(arr.length === 0) {
            return target === 0
        }
        var head = arr[0];
        var tail = arr.slice(1);
        // check if the target can be reached by substracting the first element from the target
        // and checking if the remaining elements contain a combination that adds up to the result
        // or check if the remaining elements contain a combination that adds up to the target
        return isContain(tail, target - head) || isContain(tail, target);
    }
}
