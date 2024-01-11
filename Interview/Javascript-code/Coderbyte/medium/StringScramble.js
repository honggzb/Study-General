//This works for almost all inputs, working to fix issues
/*Using the JavaScript language, have the function StringScramble(str1,str2)
take both parameters being passed and return the string true if a portion of str1 
characters can be rearranged to match str2, otherwise return the string false. For example: if str1 is "rkqodlw"
and str2 is "world" the output should return true. Punctuation and symbols will not be entered with the parameters. 

if str1 characters can be rearranged to match str2, return true, else return false
"cdore" & "coder" --> true
"h3llko" & "hello" --> false

*******************************************************************************************/
  
function StringScramble(str1, str2) {
     for(let i =0; i<str2.length; i++) {
        let char = str1[i];
        let index = str1.indexOf(char);
        if(index === -1) {
            return false
        }
        str1 = str1.substring(0, index) + str1.substring(index + 1)
     }
     return true;
}

/*******************************************************************************************/
function StringScramble(str1,str2) { 
  var arr=[];
  for(i=0; i<str2.length; i++){
    for(j=0; j<str1.length; j++){
    if(str1.charAt(j) == str2.charAt(i)){
      arr.push(str1.charAt(j));
    }
  }
  }
arr = arr.join("");
  if(arr==str2){
    return true;}
  else{return false;}
         
}
