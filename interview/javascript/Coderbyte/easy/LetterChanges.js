/*
QUESTION: 
Have the function LetterChanges(str) take the str parameter being passed and modify it using the following algorithm. 
Replace every letter in the string with the letter following it in the alphabet (ie. c becomes d, z becomes a). 
Then capitalize every vowel in this new string (a, e, i, o, u) and finally return this modified string.

"hello3" -> "Ifmmp3"
"fun times!" -> "gvO Ujnft!"
*/

function LetterChanges(str) {
    var abc = "abcdefghijklmnopqrstuvwxyz";
    var rot1 = {"z":"a"};
    var l,i;
    var vowels = {
        "a":"A",
        "e":"E",
        "i":"I",
        "o":"O",
        "u":"U"
    }
    for(i=0;i<abc.length-1;i++){ //avoid z
        l = abc[i+1];
        rot1[abc[i]] = (vowels.hasOwnProperty(l))?vowels[l]:l;
    }
    _str = str.split("");
    for(i=0;i<_str.length;i++){
        l = _str[i];
        _str[i] = (rot1.hasOwnProperty(l))?rot1[l]:l;
    }
    // code goes here
    return _str.join("");
}

// another solution
function LetterChanges(str) {
    let charArr = str.split("";) 
    for(let i=0; i< str.length; i++) {
        //handle z to a
        if(charArr[i] === 'z') {
            charArr[i] = 'A';
            continue;
        }
        charArr[i] = String.fromCharCode(charArr[i].charCodeAt(0) + 1);
        charArr[i].match(/[aeiou]/gi]){
            charArr[i] = charArr[i].toUpperCase();
        }
    }
    return charArr.join("");
}
