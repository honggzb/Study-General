/*Using the JavaScript language, have the function CaesarCipher(str,num)
take the str parameter and perform a Caesar Cipher shift on it using the num 
parameter as the shifting number. A Caesar Cipher works by shifting each letter
in the string N places down in the alphabet (in this case N will be num). 
Punctuation, spaces, and capitalization should remain intact.
For example if the string is "Caesar Cipher" and num is 2 the output should be "Ecguct Ekrjgt"*/

shift string according to num
"Hello" num=4 -> Lipps
"abc" num=0 -> abc

****************************************************************/
  
function CaesarCipher(str, num) {
    // Splitting the string into an array of characters and mapping over each character
  str = str.split('').map(function(s){
    // Converting the character to its ASCII code
    s = s.charCodeAt();
    // Checking if the character is an alphabet
    if ((s > 64 && s < 91) || (s > 96 && s < 123)) {
      // Adding the shift number to the ASCII code
      s = s+num;
      // Checking if the ASCII code is outside the range of alphabets
      if ((s > 90 && s < 97) || s > 122) {
        // If it is, wrap around the alphabets by subtracting 26
        s -= 26
      }
    }
    // Converting the ASCII code back to its character form
    return String.fromCharCode(s)
  })
  // Joining the array of characters back to form a string
  return str.join('')
}

/****************************************************************/

function CaesarCipher(str,num) { 
    var arr =[];
    var re = /[a-z]/i;
    for(var i=0; i<str.length; i++){
        if(str[i].match(re)){
            arr.push(str.charCodeAt(i)+num);
        }
        else{
            arr.push(str.charCodeAt(i));
        }
    }
    for(var i=0; i<arr.length; i++){
        arr[i] = String.fromCharCode(arr[i]);
    }
    return arr.join("");
}
