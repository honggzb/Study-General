/*
start from index of first number, rotate all array
[3,2,1,6] --> 6321, the first number of array is 3, start from index 3 is 6,
[4,3,4,3,1,2] --> 124343, the first number of array is 4, start from index 4 is 1,
*/

function ArrayRotation(str) {
    const n = arr[0];
    const result = [];
    for(let i=n;i<arr.length;i++) {
        result.push(arr[i]);
    }
    if(n>0){
        for(let i=0;i<n;i++) {
            result.push(arr[i]);
        }
    }
    return result.join('');
}
