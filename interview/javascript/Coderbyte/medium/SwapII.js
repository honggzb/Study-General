/*Using the JavaScript language, have the function SwapII(str) 
take the str parameter and swap the case of each character.
Then, if a letter is between two numbers (without separation),
switch the places of the two numbers. For example: if str is "6Hello4 -8World, 7 yes3" 
the output should be 4hELLO6 -8wORLD, 7 YES3. 

take the str parameter and swap the case of each character. Then if a letter is between two numbers, switch the places of the two numbers
"6Heelo4 -8World, 7 yes3" --> "4hEELO6 -8wORLD, 7 YES3"
"2s 6 du5d4e" --> "2S 6 DU4D5E"

*************************************************************************************/
function SwappII(str) {
    str = str.replace(/(a-z)|(A-Z)/g, function(match, p1, p2) {
        if(p1) {
            return p1.toUpperCase();
        } else {
            return p2.toLowerCase();
        }
    });
    str = str.replace(/\d+[a-zA-Z]+\d+/g, function(match) {
        var firstNumber = match.match(/\d+/)[0];
        var secondNumber = match.match(/\d+$/)[0];
        var letters = match.match(/[a-zA-Z]+/)[0];
        return secondNumber + letters +  firstNumber;
    })
    return str;
}

/*************************************************************************************/

function SwapII(str){
    var re= /[a-z]/;
    var re2= /[A-Z]/;
    var re3= /[0-9]/;
    var re4= /[a-z]/i;
    var arr=[];
    for(var i=0; i<str.length; i++){
        if(str.charAt(i).match(re)){
            arr.push(str[i].toUpperCase());
        }
        else if(str[i].match(re2)){
            arr.push(str[i].toLowerCase());
        }
        else{
            arr.push(str[i]);
        }
    }
for(var i=0; i<arr.length; i++){
    if(arr[i].match(re3)){
        for(var j=i+1; j<arr.length; j++){
            if(arr[j] == " "){
                break;
            }
            else if(arr[j].match(re3)){
                var hold = arr[i];
                arr[i]=arr[j];
                arr[j]=hold;
            }
        }
    }
}
return arr.join("");
}  
