/*
"wwwggopp" -> 3w2g1o2p
"wwwbbw" -> 3w3b1w
*/

function RunLength(str) {
    let result = "";
    let count = 1;
    if(str.length === 0) {
        return 0;
    }
    if(str.length === 1) {
        return count + str;
    }
    for(let i =0; i<str.length; i++) {
        if(str[i] === str[i+1]){
            count++;
        } else {
            result = count + str[i];
            count = 0
        }
    }
    return result;
}
