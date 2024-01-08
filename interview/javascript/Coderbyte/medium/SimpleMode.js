/*Using the JavaScript language, have the function SimpleMode(arr) 
take the array of numbers stored in arr and return the number that 
appears most frequently (the mode). For example: if arr contains 
[10, 4, 5, 2, 4] the output should be 4. If there is more than one 
mode return the one that appeared in the array first (ie. [5, 10, 10, 6, 5]
should return 5 because it appeared first). If there is no mode return -1. The array will not be empty. 

return the number that appears most frequently(the mode), if there is no mode then return -1
[5,5,2,2,1] --> 5
[5,10,10,6,5] --> 5
[4,5,3,6] -> -1

*******************************************************************************************************/
  
function SimpleMode(str) {
    let count = {};
    let mode = -1;
    const firstocurrence = {};
    let maxCount = 0;
    for(let i=0;i<str.length;i++) {
        const num = str[i];
        if(num in count) {
            count[num]++;
        } else {
            count[num] = 1;
            firstocurrence[num] = i;
        }
        if(count[num]) > maxCount || (count[num] === maxCount && firstocurrence[num] < firstocurrence[mode]) {
            maxCount = count[num];
            mode = num;
        }
    }     
    return maxCount > 1 ? mode : -1;
}

/*******************************************************************************************************/

function SimpleMode(arr){
var mode=0;
var count2=0;
for(var i=0; i<arr.length; i++){
    var count=0;
    for(var j=0; j<arr.length; j++){
        if(arr[i] == arr[j] && j!==i){
            count++;
        }
        if(count>count2){
            mode = arr[i];
            count2 = count;
            count =0;
        }
    }
}
if(count2==0){
    return -1;
    }
return mode;
}
