/*
[3, 5, 2, -4, 8, 11] --> [[11, -4], [2, 5]] because 11 + -4 = 7 and 2+5
*/
  
function twoSum(str, s) {
 var sums = [];
  var hashTable = {};
  // check each element in array
  for (var i = 0; i < arr.length; i++) {
    // calculate S - current element
    var sumMinusElement = s - arr[i];
    // check if this number exists in hash table
    // if so then we found a pair of numbers that sum to S
    if (hashTable[sumMinusElement.toString()] !== undefined) { 
      sums.push([arr[i], sumMinusElement]);
    }
    // add the current number to the hash table
    hashTable[arr[i].toString()] = arr[i];
  }
  // return all pairs of integers that sum to S
  return sums;
}
