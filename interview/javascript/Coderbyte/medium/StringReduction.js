/*
check nested HTML element is matched
"abcabc" -> 2
"cccc" -> 4
*/
  
function StringReduction(str) {
    var res = str.length + 1;
    while(res > str.length) {
        res = str.length;
        str = str.replace(/ab|ba/, 'c');
        str = str.replace(/ca|ac/, 'b');
        str = str.replace(/bc|cb/, 'a');
    }
    return str.length;
}
