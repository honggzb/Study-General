/*
QUESTION:
Have the function VowelSquare(strArr) take the strArr parameter being passed which will be a 2D matrix of some arbitrary size filled with letters from the alphabet, and determine if a 2x2 square composed entirely of vowels exists in the matrix. For example: strArr is ["abcd", "eikr", "oufj"] then this matrix looks like the following:

a b c d
e i k r
o u f j

Within this matrix there is a 2x2 square of vowels starting in the second row and first column, namely, ei, ou. If a 2x2 square of vowels is found your program should return the top-left position (row-column) of the square, so for this example your program should return 1-0. If no 2x2 square of vowels exists, then return the string not found. If there are multiple squares of vowels, return the one that is at the most top-left position in the whole matrix. The input matrix will at least be of size 2x2.
===============================================================================
Input:["aqrst", "ukaei", "ffooo"]        --> "1-2"
Input:["gg", "ff"]                       -->  "not found"
*/
function isVowel(c){
    switch(c){
		case 'a': case 'A':
		case 'e': case 'E':
		case 'i': case 'I':
		case 'o': case 'O':
		case 'u': case 'U':
			return true;
		default:
			return false;
}
}

function VowelSquare(strArr) {
    var arr = [];
    var i,j;
    //Make string array a 2D array.
    for(i=0;i<strArr.length;i++){
        arr.push(strArr[i].split(""));
    }
    for(i=0;i<arr.length-1;i++){
		for(j=0;j<arr[i].length-1;j++){
			if( isVowel(arr[i][j]) && isVowel(arr[i+1][j]) && isVowel(arr[i][j+1])  && isVowel(arr[i+1][j+1]) ){
				return i+"-"+j;
			}
		}
   }
  return "not found";
}


/***************************************************************************************
*                                                                                      *
*                  CODERBYTE BEGINNER CHALLENGE                                        *
*                                                                                      *
*  Vowel Count                                                                         *
*  Using the JavaScript language, have the function VowelCount(str) take the str       *
*  string parameter being passed and return the number of vowels the string contains   *
*  (ie. "All cows eat grass" would return 5). Do not count y as a vowel for this       *
*  challenge.                                                                          *
*                                                                                      *
*  SOLUTION                                                                            *
*  I will be using two for loops that will be nested. I will be searching thru all     *
*  entries in my vowel array in the outter loop and searching through each letter      *
*  in the string in the inner loop. I will be comparing each vowel to every letter     *
*  in the string. If it matches then I will be incrememting by total by 1.
*                                                                                      *
*  Steps for solution                                                                  *
*    1) create my vowel arrray.                                                        *
*    2) Initialize tot to zero.                                                        *
*    3) Loop through each vowel and compare to each letter in string                   *
*    4) If match then increment tot by 1                                               *
*    5) Return tot as answer                                                           *
*                                                                                      *
***************************************************************************************/
function VowelCount(str) { 

  var vowelArr = ["a","e","i","o","u"];
  var tot = 0;

  for (var i = 0; i < vowelArr.length; i++) {
    for (var j = 0; j < str.length; j++) {
        if (str[j] === vowelArr[i]) {
            tot++;
        }
    }
  }
  return tot;
         
}

