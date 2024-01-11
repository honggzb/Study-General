/*
QUESTION:
Have the function FirstReverse(str) take the str parameter being passed and return the string in reversed order. 
For example:  "Hello World and Coders"   -->   "sredoC dna dlroW olleH". 
*/

function FirstReverse(str) {
	return str.split("").reverse().join("");
}
