[Coderbyte](#top)

- [1. BracketMatcher - medium](#1-bracketmatcher---medium)
- [2. Factorial -easy](#2-factorial--easy)
- [3. RunLength - medium](#3-runlength---medium)
- [4. StringScramble - medium](#4-stringscramble---medium)
- [5. ArrayAddition - medium](#5-arrayaddition---medium)
- [6. NumberSearch - medium](#6-numbersearch---medium)
- [7. SwappII - medium](#7-swappii---medium)
- [8. SimpleMode - medium](#8-simplemode---medium)
- [9. CountingMinutes - medium](#9-countingminutes---medium)
- [10. SeatingStudents - medium](#10-seatingstudents---medium)
- [11. LetterChanges - easy](#11-letterchanges---easy)
- [12. EightQueens - medium](#12-eightqueens---medium)
- [13. BlackjackHighest - hard](#13-blackjackhighest---hard)
- [15. LetterCount - medium](#15-lettercount---medium)
- [16. Calculator - medium](#16-calculator---medium)
- [17. Caesar Cipher - medium](#17-caesar-cipher---medium)
- [18. BitmapHoles - medium](#18-bitmapholes---medium)
- [19. StockPicker - medium](#19-stockpicker---medium)
- [21. MostFreeTime - medium](#21-mostfreetime---medium)
- [22. CoinDeterminer - medium](#22-coindeterminer---medium)
- [23. FibonacciChecker - medium](#23-fibonaccichecker---medium)
- [24. FindIntersection - medium](#24-findintersection---medium)
- [25. twoSum - medium](#25-twosum---medium)
- [26. HTMLElements - medium](#26-htmlelements---medium)
- [27. GasStation - hard](#27-gasstation---hard)
- [28. ArrayRotation - hard](#28-arrayrotation---hard)
- [29. TimeConvert - easy](#29-timeconvert---easy)
- [30. AlphabetSoup - easy](#30-alphabetsoup---easy)
- [31. MissingDigit - Medium](#31-missingdigit---medium)
- [32. SimplePassword - Medium](#32-simplepassword---medium)
- [33. WordSplit - Medium](#33-wordsplit---medium)
- [34. PermutationStep - Medium](#34-permutationstep---medium)
- [35. Division - Medium](#35-division---medium)
- [36. StringReduction - Medium](#36-stringreduction---medium)
- [37. DistinctList - Medium](#37-distinctlist---medium)
- [38. RomanNumeralReduction - hard](#38-romannumeralreduction---hard)
- [39. Wildcards - hard](#39-wildcards---hard)
- [40. SudokuQuadrantChecker - hard](#40-sudokuquadrantchecker---hard)
- [41. Arith Geo -easy](#41-arith-geo--easy)
- [43. Min Window Substring -hard](#43-min-window-substring--hard)
- [44. First Reverse -easy](#44-first-reverse--easy)
- [45. Longest Word -easy](#45-longest-word--easy)
- [46. Product Digits -medium](#46-product-digits--medium)
- [47. Moving Median -medium](#47-moving-median--medium)
- [48. Longest Matrix Path -medium](#48-longest-matrix-path--medium)
- [49. Palindromic Substring -medium](#49-palindromic-substring--medium)
- [50. Preorder Traversal -medium](#50-preorder-traversal--medium)
- [51. Symmetric Tree -medium](#51-symmetric-tree--medium)
- [52. Tree Constructor -medium](#52-tree-constructor--medium)
- [53. String Periods - medium](#53-string-periods---medium)
- [54. Max Subarray -medium](#54-max-subarray--medium)
- [55. meanMode](#55-meanmode)
- [56. Array Challenge](#56-array-challenge)
- [57. Palindrome Creator](#57-palindrome-creator)
- [tip](#tip)

-------------------------------------------------------

## 1. BracketMatcher - medium

- "(coder)(byte)"   -> output 0
- "(c(oder))(b(yte)" -> output 1
- if str contains no brackets -> output 1

```javascript
function bracketMatcher(str) {
    const stack = [];
    for(let i=0; i<str.length; i++) {
        if(str[i] === '(') {
            stack.push(str[i]);
        } else if(str[i] === ')'){
            if(stack.length === 0) {
                return 0;
            } else {
                stack.pop();
            }
        }
    }
    return stack.length === 0 ? 1 : 0;
}
```

[⬆ back to top](#top)

## 2. Factorial -easy

- FirstFactorial(4) = 4 * 3 * 2 *1

```javascript
function FirstFactorial(number) {
    if(number === 1 || number === 0) {
        return number;
    } else {
        return number * FirstFactorial(number -1);
    }
}
```

[⬆ back to top](#top)

## 3. RunLength - medium

- "wwwggopp" -> 3w2g1o2p
- "wwwbbw"   -> 3w3b1w

```javascript
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
```

[⬆ back to top](#top)


## 4. StringScramble - medium

- if str1 characters can be rearranged to match str2, return true, else return false
- "cdore" & "coder" --> true
- "h3llko" & "hello"  --> false

```javascript
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
```

[⬆ back to top](#top)


## 5. ArrayAddition - medium

- return true if **any combination** of numbers(excluding the largest number) of arr be added up to equal lagest number
- [4,6,23,10,1,3], 4+6+10+1+3=23 --> true
- [3,5,-1,8,12], 5-1+8=12        --> true
- [5,7,16,1,2]      --> false

```javascript
function ArrayAddition(arr) {
    let largest = Math.max(...arr);
    // remove the largest number from the arr
    let index = arr.indexOf(largest);
    arr.splice(index, 1);  // the remaining elements that excludign largest one
    let sum = arr.reduce((acc, val) => acc + val, 0);
    //check if any combination of the remaining numbers can add up to the largest number
    function checkSum(arr, target) {
        if(target === 0) {
            return true;
        }
        if(arr.length === 0) {
            return false;
        }
        let current = arr[0];
        let remaining = arr.slice(1);
        return checkSum(remaining, target) || checkSum(remaining, target - current);
    }
    return checkSum(arr, largest - sum) ? false : true;
}
// good solution
function ArrayAddition(arr) {
    //sort array in ascending order and remove the largest number
    var target = arr.sort(function(a, b){ return a-b}).pop();
    return isContains(arr, target);
    function isContains(arr, target) {
        if(arr.length === 0) {
            return target === 0
        }
        var head = arr[0];
        var tail = arr.slice(1);
        // check if the target can be reached by substracting the first element from the target
        // and checking if the remaining elements contain a combination that adds up to the result
        // or check if the remaining elements contain a combination that adds up to the target
        return isContain(tail, target - head) || isContain(tail, target);
    }
}
```

[⬆ back to top](#top)

## 6. NumberSearch - medium

- search all the numbers in the string, add them together, then return final number divided by the total amount of letters in the string
- "H3ello9-9"       --> (3+9+9)/5 = 4
- "One Number*1**"  --> 0

```javascript
function NumberSearch(str) {
    var total = 0;
    var letterCount =0;
    for(let i=0; i<str.length; i++){
        var char = str.charAt(i);
        if(!isNaN(char) && char !== " ") {
            total += ParseInt(char);
        }
        if(/[a-zA-z].test(char)) {
            letterCount++;
        }
    }
    return Math.round(total/letterCount);
}
```

[⬆ back to top](#top)

## 7. SwappII - medium

- take the str parameter and swap the case of each character. Then if a letter is between two numbers, switch the places of the two numbers
- "6Heelo4 -8World, 7 yes3"  --> "4hEELO6 -8wORLD, 7 YES3"
- "2s 6 du5d4e"   --> "2S 6 DU4D5E"

```javascript
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
```

[⬆ back to top](#top)

## 8. SimpleMode - medium

- return the number that appears most frequently(the mode),  if there is no mode then return -1
- [5,5,2,2,1] --> 5
- [5,10,10,6,5]  --> 5
- [4,5,3,6] -> -1

```javascript
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
```

[⬆ back to top](#top)

## 9. CountingMinutes - medium

- input will be two times that each formatted with a colon and am or pm, return the total number of minutes between the two times. The time will be in a 12 hour clock format
- "9:00am-10:00am" -> 60
- "12:30pm-12:00am" -> 690
- "1:23am-1:08am" -> 1425

```javascript
function CountingMinutes(str) {
    const [starttime, endtime] = str.split("-");
    const startMinutes = getMinutesFromMidnight(starttime);
    const endMinutes = getMinutesFromMidnight(endtime);
    return (endMinuts - startMinues + 1400) % 1440;
}
function getMinutesFromMidnight(timeStr) {
    const [hourstr, minuteStr] = timeStr.slice(0, -2).slit(":")
    const hour = parseInt(hourStr);
    const minutes = parseInt(minuteStr);
    const isPM = timeStr.slice(-2) === "pm";
    const totalMinutes = hour * 60 + minutes;
    return isPM ? totalMinutes + 720 : minutes;
}
```

[⬆ back to top](#top)

## 10. SeatingStudents - medium

- [12, 2, 6, 7, 11]  -> 6
- [6, 4]     -> 4
- [8, 1, 8]  -> 6
  
```
1 2       |  4 is occupied desk
3 [4]     | there are a total 4 ways to seat 2 new students next to each other
5 6       | [1 2], [1 3], [3 5], [5 6]
---------------------------------------------------------------------------------
[1] 2     |
3   4     | [2 4], [3 4], [3 5], [4 6], [5 6], [5 7]
5   6     |
7  [8]    |
```

```javascript
function SeatingStudents(arr) {
    const k = arr[0];
    const occupied = new Set(arr.slice(1));
    let count = 0;
    for(let i=1;i<k;i++) {
        if(!occupied.has(i)) {
            // check to the right
            if(i % 2 === 1 && !occupied.has(i+1) && i+1 <=k) {
                count++;
            }
            //check to below
            if(i<k-1 && !occupied.has(i+ 2)) {
                count++
            }
        }
    }
    return count;
}
//
function SeatingStudents(arr) {
    const [numDesks, ...occupiedDesk] = arr;
    let count = 0;
    for(let i=1; i<numDesks; i++) {           
        if(!occupiedDesk.includes(i)) {
             // check to the right
            if(i % 2 === 1 && !occupiedDesk.includes(i+1) && i+1 <= numDesks) {
                count++;
            }
            //check to below
            if(!occupiedDesk.includes(i+2) && i < numDesks -1) {
                count++;
            }
        }
    }
    return count;
}
```

[⬆ back to top](#top)

## 11. LetterChanges - easy

- replace every letter in ther string with the following in the alphabet, such as c -> b, z -> a, capitalize every vowel(a,e,i,o,u)
- "hello*3"   -> "Ifmmp*3"
- "fun times!" -> "gvO Ujnft!"

```javascript
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
```

[⬆ back to top](#top)

## 12. EightQueens - medium

- 在8×8格的国际象棋上摆放8个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法
- (1) ["(2,1)", "(4,2)", "(6,3)","(8,4)","(3,5)", "(1,6)", "(7,7)","(5,8)"]  -> return true
- (2) ["(2,1)", "(4,3)", "(6,3)","(8,4)","(3,4)", "(1,6)", "(7,7)","(5,8)"]  -> return (2,1)
- (3) ["(2,1)", "(5,3)", "(6,3)","(8,4)","(3,4)", "(1,8)", "(7,7)","(5,8)"]  -> return (5,3)
- return first queen that is attacking another piece in the same format it was provided

```
       (1)         |        (2)          |        (3)
x x x x x o x x    |  x x x x x o x x    |  x x x x x x x o
o x x x x x x x    |  o x x x x x x x  v |  o x x x x x x x
x x x x o x x x    |  x x x o x x x x    |  x x x o x x x x
x o x x x x x x    |  x x o x x x x x    |  x x x x x x x x
x x x x x x x o    |  x x x x x x x o    |  x x o x x x x o  v
x x o x x x x x    |  x x o x x x x x    |  x x o x x x x x
x x x x x x o x    |  x x x x x x o x    |  x x x x x x o x
x x x o x x x x    |  x x x o x x x x    |  x x x o x x x x
```

```javascript
function EightQueens(str){
    //convert string input to an array of coordinates
    const queens = str.map((coord) => {
        const x = parseInt(coord[1]);
        const y = parseInt(coord[3]);
        return [x, y];
    });
    //check if any queens are attacking each other
    for(let i=0;i<queens.length;i++) {
        for(let j=i+1;j<queens.length;j++) {
            const q1 = queens[i];
            const q2 = queens[j];
            if(q1.x === q2.x && q1.y === q2.y && Math.abs(q1.x-q2.x) === Math.abs(q1.y-q2.y)) {
                return `(${q1.x},${q1.y})
            }
        }
    }
    return true;
}
```

[⬆ back to top](#top)

## 13. BlackjackHighest - hard

- the full list of possilbilities for str is : "two,three,four,five,six,seven,eight,nine,ten,jack,queen,king,ace"
- output should be "below,above,or blackjack"
- blackjack: numbers add up to 21
- ["four", "ten", "king"]  -> above king
- ["four", "ace", "ten"]  -> below ten
- ["ace", "queen"]        -> blackjack ace

```javascript
function BlackjackHighest(str) {
    const cardValues ={
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "jack": 10,
        "queen": 10,
        "king": 10,
        "ace": 11,   //treat ace as 11 by default
    };
    let totalValue = 0;
    let hasAce = false;
    let highestCard = null;
     for(let i=0;i<str.length;i++) {
        const cardValue = cardValues[str[i]];
        totalValue += cardValue;
        if(str[i] === 'ace') {
            hasAce = true;
        }
        if(!highestCard || cardValue > cardValues[highestCard]) {
            highestCard = str[i];
        }
     }

     if(totalValue > 21 && hasAce) {
        totalValue -= 10;
     }
     if(totalValue === 21) {
        return 'blackjack' + highestCard;
     } else if(totalValue < 21) {
        return 'below' + highestCard;
     } else {
        return 'above' + highestCard;
     }
}
```

[⬆ back to top](#top)

## 15. LetterCount - medium

- return the first word with the greatest repeated letters
- "Today, it the greatest day ever!"   -> greatest(have 2 e)
- "Hello apple pie"   -> return hello
- "No word"           -> return -1

```javascript
function LetterCount(str) {
    const words = str.split(' ');
    let maxWord = '';
    
    for(let i=0;i<words.length;i++) {
        const counts = {};
        let count = 0;
        for(let j=0;j<words[i].length;j++) {
            const char = words[i][j];
            counts[char] = counts[char] ? counts[char] + 1 : 1;
            if(counts[char] > count) {
                count = counts[char];
            }
        }
        if(count > maxCount) {
            maxCount = count;
            maxWord = words[i];
        }
    }
    return maxWord || -1;
}
```

[⬆ back to top](#top)

## 16. Calculator - medium

- input string and calculate according to mathematical system
- "6*(4/2)+3*1"   -> 15
- "2+(3-1)*3"     -> 8

```javascript
function Calculator(str) {
    var stack = [];
    var lastToken;
    var performFunc = function(a, b, func) {
        switch(func) {
            case "+": 
                return a + b;
                break;
            case "-": 
                return a - b;
                break;
            case "/": 
                return a / b;
                break;
            case "*": 
                return a * b;
                break;
        }
    };
    var processStack = function(stack) {
    var i = 0;
    if(stack.length == 0)
      return NaN;
      
    if(stack.length == 1)
      return stack;
      
    while(i < stack.length && stack.length > 2) {
      if(stack[i+1] == '*' || stack[i+1] == '/') {
        var a = stack[i];
        var b = stack[i+2];
        var func = stack[i+1];
        var value = performFunc(a,b,func);
        stack.splice(i,3,value);
      } else {i+=2;}
    }
    i = 0;
    while(i < stack.length && stack.length > 2) {
      if(stack[i+1] == '+' || stack[i+1] == '-') {
        var a = stack[i];
        var b = stack[i+2];
        var func = stack[i+1];
        var value = performFunc(a,b,func);
        stack.splice(i,3,value);
      } else {i+=2;}
    }
    return stack;
  };

  var processChar = function(char) {
    if(char == "+") {
      stack.push("+");
    } else if(char == "-") {
      stack.push("-");
    } else if(char == "/") {
      stack.push("/");
    } else if(char == "*") {
      stack.push("*");
    } else if(char == "(") {
      if(lastToken === ")" ||
         ( lastToken !== undefined &&
           lastToken.match(/d+/g) != null)) {
        stack.push("*");
      }
      stack.push("(");
    } else if(char == ")") {
      var parenStack = [];
      while( (char = stack.pop()) != "(") {
        parenStack.unshift(char);
      }
      stack.push(processStack(parenStack).pop());
    } else {
      stack.push(parseInt(char));
    }
  };
  //var tokens = str.match(/d+|[()+-*/]/g);
  var tokens = str.match(/\d+|[()+\-*/]/g);
  for(var i = 0; i < tokens.length; i++) {
    processChar(tokens[i]);
    lastToken = tokens[i];
  }
  stack = processStack(stack);
  return stack.pop();
}
```

[⬆ back to top](#top)

## 17. Caesar Cipher - medium

- shift string according to num
- "Hello" num=4 -> Lipps
- "abc"  num=0  -> abc

```javascript
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
```

## 18. BitmapHoles - medium

- return contiguous regions of 0's
- ["10111","10101","11101","11111"]  -> 2
- ["01111","01101","00011","11110"] -> 3
- ["1011","0010"]   -> 2

```
1 0 1 1 1   |  0 1 1 1 1    |    1 0 1 1
1 0 1 0 1   |  0 1 1 0 1    |    0 0 1 0
1 1 1 0 1   |  0 0 0 1 1
1 1 1 1 1   |  1 1 1 1 0
```

```javascript
function BitmapHoles(strArr) {
    // declare an empty array to hold coordinates of all 0's
    var index = [],
        // initialize the number of holes to 0
        holes = 0,
        checker;
    // loop through each string in the array
    for (var i = 0; i < strArr.length; i++) {
        // split each string into individual characters
        strArr[i] = strArr[i].split('');
        // loop through each character
        for (var j = 0; j < strArr[i].length; j++) {
            // if the character is 0, add its coordinates to the index array
            if (strArr[i][j] === "0") {
                index.push([i, j]);
            }
        }
    }
    // loop through each coordinate in the index array
    for (var c = 0; c < index.length; c++) {
        checker = false;
        // loop through the remaining coordinates in the index array
        for (var k = c + 1; k < index.length; k++) {
            // if the two coordinates are adjacent, set the checker variable to true
            if (index[k][0] === index[c][0] + 1 && index[k][1] === index[c][1] || index[k][0] === index[c][0] && index[k][1] === index[c][1] + 1) {
                checker = true;
            }
        }
        // if the checker variable is still false, increment the holes variable
        if (checker === false) {
            holes += 1;
        }
    }
    // return the number of holes
    return holes;
}
```

[⬆ back to top](#top)

## 19. StockPicker - medium

- return the **maximum** profit that on day x and selling stock on day y where **y > x**
- If there is not profit that could have been made with the stock prices, then your program should return -1
- [44, 30, 24, 32, 35, 30, 40, 38, 15]  -> 16
- [10, 12, 4, 5, 9]   -> 5
- [14, 20, 4, 12, 5, 11]   -> 8
- [10, 9, 8, 2]   -> -1
  
```javascript
function StockPicker(str) {
    var profit=-1; // Initialize the maximum profit to -1
    var buyPrice=arr[0]; // Initialize the buying price to the first element of the array
    for(var i=1; i<arr.length; i++){ // Loop through the array starting from the second element
        if(arr[i]<buyPrice){ // If the current element is smaller than the buying price
            buyPrice=arr[i]; // Update the buying price
        }
        else if( (arr[i]-buyPrice) > profit){ // If selling the stock at the current price will give a greater profit than the previous maximum profit
            profit=arr[i]-buyPrice; // Update the maximum profit
        }
    }
  return profit; // Return the maximum profit 
}
```

[⬆ back to top](#top)

## 21. MostFreeTime - medium

- output the longest amount of free timev
- ["10:00AM-12:30PM","02:00PM-02:45PM","09:10AM-09:50AM"]  -> 
- ["12:15AM-02:30PM","09:00AM-10:00AM","10:30AM-12:00PM"]  -> 00:30
- ["12:15AM-02:00PM","09:00AM-12:11PM","02:02PM-04:00PM"]  -> 00:04

```javascript
function MostFreeTime(str) {
    // create an empty array to store the minutes of each event
    var minArr = []
    // create a variable to keep track of the longest free time
    var longest = 0

    // function to convert a time string to minutes
    function timeCalc(time) {
        var min = 0
        // add 12 hours (720 minutes) for pm times
        if(time.match(/pm/i)) {
            min += 720
        }
        // add the hours converted to minutes
        if(time.split(':')[0] !== '12') {
           min += time.split(':')[0] * 60
        } 
        // add the minutes
        min += Number(time.split(':')[1].match(/[0-9][0-9]/)[0])
        return min
    }
    // loop through the array of events and convert each time to minutes
    for(var i = 0; i < strArr.length; i++) {
        var time1 = strArr[i].split('-')[0]
        var time2 = strArr[i].split('-')[1]
        minArr.push([timeCalc(time1), timeCalc(time2)])
    }    
    // sort the array of minutes in ascending order
    minArr.sort(function(a, b) {
        return a[0] - b[0]
    })
    // loop through the sorted array and find the longest free time
    for(var j = 0; j < minArr.length - 1; j++) {
        if(longest < minArr[j + 1][0] - minArr[j][1]) {
            longest = minArr[j + 1][0] - minArr[j][1]
        }
    }
    // convert the longest free time to hours and minutes
    var hours = 0
    while(longest >= 60) {
        longest -= 60;
        hours ++
    }
    // add a leading zero if necessary for single-digit minutes and hours
    if(hours.toString().length === 1) {
        hours = "0" + hours
    }
    if(longest.toString().length === 1) {
        return hours + ":0" + longest
    } else {
        return hours + ":" + longest
    }
}
```

[⬆ back to top](#top)

## 22. CoinDeterminer - medium

- input <-- will be an integer ranging from 1 to 250, and 
- return <-- an integer output that will specify the least number of coins(1, 5, 7, 9, 11)
- 16    ->   2, because 9 + 7 = 16
- 25    ->   3, because 11 + 9 + 5 = 25

```javascript
function CoinDeterminer(num) {
     //initialize count to 0
    var count = 0;
    //subtract 11 from num as many times as possible
    while(num>10){
        if(num % 11 > 1 && num % 11 < 5){
            num -= 9; //if the remainder of num divided by 11 is between 2 and 4, subtract 9 instead of 11
            count++; //increment count by 1
        } else {
            num -= 11; //subtract 11
            count++; //increment count by 1
        }
    }
    //subtract 9 from num as many times as possible
    while(num>8){
        if(num % 9 > 1 && num % 9 < 5){
            num -= 7; //if the remainder of num divided by 9 is between 2 and 4, subtract 7 instead of 9
            count++; //increment count by 1
        } else {
            num -= 9; //subtract 9
            count++; //increment count by 1
        }
    }
    //subtract 7 from num as many times as possible
    while(num>6){
        num -= 7; //subtract 7
        count++; //increment count by 1
    }
    //subtract 5 from num as many times as possible
    while(num>4){
        num -= 5; //subtract 5
        count++; //increment count by 1
    }
    //subtract 1 from num as many times as possible
    while(num>0){
        num -= 1; //subtract 1
        count++; //increment count by 1
    }
    
    //return the count
    return count;
}
```

[⬆ back to top](#top)

## 23. FibonacciChecker - medium

- return the string yes if the number given is part of the Fibonacci sequence
- 0 1 2 3 5 

```javascript
function FibonacciChecker(num) {
// Initialize an array with the first value of the Fibonacci sequence
  var prev = [0]
  // Loop through each number in the sequence up to and including the input number
  for (i = 1; i < num+1; i) {
    // Calculate the next number in the sequence by adding the previous two
    var check = i + prev[0]
    // If the calculated number is equal to the input number, return "yes"
    if (check === num) {
      return 'yes'
    }
    // Add the current number to the beginning of the array to keep track of the previous two numbers
    prev.unshift(i)
    // Update the current number to be the next number in the sequence
    i = check
  }
  // If the input number is not in the Fibonacci sequence, return "no"
  return 'no' 
}
```

[⬆ back to top](#top)

## 24. FindIntersection - medium

- ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]   --> 1,4,13
- ["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"]  --> 1,9,10

```javascript
function FindIntersection(str) {
    const lists = str.map(r => r.split(","));
    const firstList = lists[0];
    const secondList = lists[1];
    let matchMap = {};
    let resultArr = [];
    firstList.forEach(num => matchMap[num] = true);
    secondList.forEach(num => {
        if(matchMap[num]) {
            resultArr.push(num);
        }
    });
    if(resultArr.length > 0) {
        return resultArr.join(",");
    }
    return false;
}
```

[⬆ back to top](#top)

## 25. twoSum - medium

- [3, 5, 2, -4, 8, 11]  -->  [[11, -4], [2, 5]] because 11 + -4 = 7 and 2+5

```javascript
function twoSum(str, s) {
 var sums = [];
  var hashTable = {};
  // check each element in array
  for (var i = 0; i < arr.length; i++) {
    // calculate S - current element
    var sumMinusElement = s - arr[i];
    // check if this number exists in hash table
    // if so then we found a pair of numbers that sum to S
    if (hashTable[sumMinusElement.toString()] !== undefined) { 
      sums.push([arr[i], sumMinusElement]);
    }
    // add the current number to the hash table
    hashTable[arr[i].toString()] = arr[i];
  }
  // return all pairs of integers that sum to S
  return sums;
}
```

[⬆ back to top](#top)

## 26. HTMLElements - medium

- check nested HTML element is matched
- "<div><p>helol</p></div>"    -->  true
- "<div><div><b></b></div></p>"  -->  div
- "<div>avc</div><p><em><i>test test test</b></em></p>"     --> i

```javascript
function HTMLElements(str) {
    let stack = [];
    for(let i=0;i<str.length;i++) {
        if(str[i] === '<' && str[i+1] !== "/") {
            let end = str.indexOf('>', i);
            let tag = str.slice(i+1, end);
            stack.push(tag);
            i = end;
        }else if(str[i] === '<' && str[i+1] === '/') {
            let end = str.indexOf('>', i);
            let tag = str.slice(i+2, end);
            let top = stack.pop();
            if(top != tag) {    //if tag do not match, return the expected tag
                return top;
            }
            i = end;
        }
    }
    if(stack.length > 0) {
        return stack.pop();
    } else {
        return "true";
    }
}
```

[⬆ back to top](#top)

## 27. GasStation - hard

- [n, g:c]  --> n: number of gas station, g: amount of gas, c: amount of gallons of gas needed to following gas station
- return index of starting gas station that allow u to travel around the whole route once
- ["4", "1:1", "2:2", "1:2", "0:1"]  --> impossible
- ["4", "0:1", "2:2", "1:2", "3:1"]  --> 4

```javascript
function GasStation(str) {
    var stations = parseInt(str[0]);
    for(let i=0;i<stations;i++) {
        var gas = 0;
        for(let j=0;j<stations;j++) {
            var index = (i + j)% stations +1;
            //split the gas and distance value
            var data = str[index].split(":");
            gas += parseInt(data[0])-parseInt(data[1]);
            //if there is not enough gas to travel to the next station
            if(gas < 0) break;
        }
        //if there is enough gas to travel around the whole route
        if(gas >= 0) {
            return i+1;
        }
    }
    return "impossible";
}
```

[⬆ back to top](#top)

## 28. ArrayRotation - hard

- start from index of first number, rotate all array
- [3,2,1,6]  --> 6321, the first number of array is 3, start from index 3 is 6, 
- [4,3,4,3,1,2]   --> 124343, the first number of array is 4, start from index 4 is 1, 

```javascript
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
```

[⬆ back to top](#top)

## 29. TimeConvert - easy

- check nested HTML element is matched
- 126 -> 2:6
- 45  -> 0:45

```javascript
function TimeConvert(num) {
    const hours = Math.floor(num/60);
    const minutes = num % 60;
    return hours + ':' + minutes;
}
```

[⬆ back to top](#top)

## 30. AlphabetSoup - easy

- return in alphabetical order

```javascript
function AlphabetSoup(str) {
    const arrayOfChars = str.split('');
    const sortedArrayOfChars = arrayOfChars.sort();
    return arrayOfChars.join('');
}
```

[⬆ back to top](#top)

## 31. MissingDigit - Medium

- Have the function MissingDigit(str) take the str parameter, which will be a simple mathematical formula with three numbers, a single operator (+, -, *, or /) and an equal sign (=) and return the digit that completes the equation. In one of the numbers in the equation, there will be an x character, and your program should determine what digit is missing. For example, if str is "3x + 12 = 46" then your program should output 4. The x character can appear in any of the three numbers and all three numbers will be greater than or equal to 0 and less than or equal to 1000000.
- "4 - 2 = x"    --> 2
- "1x0 * 1200"   --> 0
- https://github.com/koko37/challenge-missing-digits/blob/master/solution.js

```javascript
function MissingDigit(str) {
    var x = 0;
    // replace 'x' in the input string with the value of 'x'(which is 0)
    var temp = str.replace('x', x);
    var arr = temp.split(' = ');
    while(eval(arr[0]) !== eval(arr[1])) {
        x++;
        //replace 'x' in the input string with updated value of 'x'
        temp = str.replace('x', x);
        arr = temp.split(' = ');
    }
    // return the value of 'x' that completes the equation
    return x;
}
```

[⬆ back to top](#top)

## 32. SimplePassword - Medium

- must have a capital letter
- must contain at least one number
- must contain a punctuation mark or mathematical symbol
- cannot have the word 'password'
- must be longer than 7 characters and shorter than 31 characters
- "turkey90AAA="  --> true
- "passWord123!!!"   --> false

```javascript
function SimplePassword(str) {
    if(!/[A-Z]/g.test(str)) return false;
    if(!/[0-9]/g.test(str)) return false;
    if(!/[!=]/g.test(str)) return false;
    if(/password/gi.test(str)) return false;
    if(!(str.length > 7 && str.length <31)) return false;
    return true;
}
```

[⬆ back to top](#top)

## 33. WordSplit - Medium

- check if first element can be split into 2 words, where both exist in second element
- ["baseball", "a,all,b,ball,bas,base,cat,code,d,e,quit"]  --> base,ball
- ["abcgefd", "a,ab,abc,abcg,b,c,dog,e,efd,zzzz"]          -->abcg,efd

```javascript
function WordSplit(str) {
    let word = str[0];
    let dictionary = str[1].split(',');
    let len = word.length;
    for(let i=1;i<len.length;i++) {
        let w1 = word.substr(0,i);
        let w2 = word.substr(i, len);
        if(dictionary.includes(w1) && dictionary.includes(w2)) { 
            return `${w1},${w2}`;
        }
    }
    return 'not possible';
}
```

[⬆ back to top](#top)

## 34. PermutationStep - Medium

- return the next number greater than num using the same digits
- 11121    -> 11211
- 41352    --> 41523

```javascript
function PermutationStep(num) {
    var arr = num.toString().split("");
    var x = arr.length, a, b, temp;
    for(var i=x-1;i>=0;i--) {
        a = arr[i];
        b = arr[i-1];
        // if current digit is greater than previous digit
        if(a>b) {
            arr[i] = b;
            arr[i-1] = a;
            //cut the remaining part starting from index i to the end
            temp = arr.splice(i, x-1).sort();
            return arr.concat(temp).join('');
        }
    }
    return -1;
}
```

[⬆ back to top](#top)

## 35. Division - Medium

- return greatest common factor
- 12, 16  --> 4, both are divisible by 1,2,4
- 7, 2    --> 1
- 36, 54   --> 18

```javascript
function Division(num1, num2) {
    var highest = 0;
    var limit = Math.min(num1, num2);
    if(num1 === 1 && num2 === 1) return 1;
    for(let i=1;i<=limit;i++) {
        if(num1 % i === 0 && num2 % i === 0) {
            highest = i;
        }
    }
    return highest;
}
```

[⬆ back to top](#top)

## 36. StringReduction - Medium

- check nested HTML element is matched
- "abcabc"    -> 2
- "cccc"      -> 4

```javascript
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
```

[⬆ back to top](#top)

## 37. DistinctList - Medium

- total number of duplicate entries
- [1,2,2,2,3]      -> 2, there are 2 duplicates of one of the element
- [0,-2,-2,5,5,5]  -> 3
- [100,2,101,4]    -> 0

```javascript
function DistinctList(str) {
    let list = new Set();
    let dupes = 0;
    for(let i=0;i<str.length;i++) {
        if(list.has(str[i])) {
            dupes++;
        } else {
            list.add(str[i]);
        }
    }
    return dupes;
}
```

[⬆ back to top](#top)

## 38. RomanNumeralReduction - hard

- input is roman numerals in decreasin order, I for 1, V for 5, L for 50, C for 100, D for 500, M for 1000
- return same number
- "XXXVVIIIIIIIIII"  -> L
- "DDLL"             -> MC

```javascript
function RomanNumeralReduction(str) {
    const ROMAN_NUMERALS = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1
    };
    let sum = 0;
    str.split('').forEach(letter => sum += ROMAN_NUMERALS[letter]);
    let output = '';
    Object.entries(ROMAN_NUMERALS).forEach(value => {
        let num = Math.floor(sum/value[1]);
        sum -= num * value[1];
        output += value[0].repeat(num);
    });
    return output;
}
```

[⬆ back to top](#top)

## 39. Wildcards - hard

- first string consist of sets of characters: +, *, $ for a number between 1-9, {N}, + for a single alphabetic character
- "+++++* abcdehhhhhh"   -> false
- "$**+*{2} 9mmmrrrkbb"  -> true

```javascript
function Wildcards(str) {
    var arr = str.split(" ");
    var pattern = arr[0];
    var word = arr[1];
    var regexptn = '';
    for(let i=0;i<pattern.length;++i) {
        if(pattern[i] === '+') regexptn += '[a-z]';
        if(pattern[i] === '$') regexptn += '[1-9]';
        if(pattern[i] === '*') {
             if(pattern[i+1] === '{') {
                regexptn += '.{' + pattern[i+2] + '}';
             } else {
                regexptn += '.{3}';
             }
        }
    }
    return new RegExp("^" + regexptn + '$').test(word);
}
```

[⬆ back to top](#top)

## 40. SudokuQuadrantChecker - hard

- fill a 9x9 matrix with digits so that each column, each row, and all 9 non-overlapping 3x3 sub-matrices contain all of the digits from 1 through 9
- ["(1,2,3,4,5,6,7,8,1)", "(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(1,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)"] => 1,3,4

```
1 2 3 4 5 6 7 8 1    |  1 2 3 4 5 6 7 8 9 
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  6 x 5 x 3 x x 4 x
1 x x x x x x x x    |  2 x 1 1 x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x x
x x x x x x x x x    |  x x x x x x x x 9
1,3,4                |  3,4,5,9
```

```javascript
function SudokuQuadrantChecker(str) {
    let board = str.map(row => row.substr(1, row.length-2).split(','));
    let errors = {};
    for(let row=0;row<board.length;row++) {
        for(let col=0;col<board[0].length;col++) {
            //ignore empty cell represented by 'x'
            if(board[row][col] === 'x') continue; 
            //caculate current quadrant number
            let quadrant = Math.floor(row /3) * 3 + Math.floor(col/3) + 1;
            //check errors in current row
            for(let i=0;i<board.length;i++) {
                if(i !== col) {   //not testing itself
                    if(board[row][i] === board[row][col]) {
                        errors[quadrant] = 1;
                    }
                }
            }
            //check for errors in the current column
            for(let i=0;i<board[0].length;i++) {
                if(i !== row) {   //not testing itself
                    if(board[i][col] === board[row][col]) {
                        errors[quadrant] = 1;
                    }
                }
            }
            //check for errors in the current 3x3 box
            for(let r=0;r<3;r++) {
                for(let c=0;c<3;c++) {
                    let rowQuadrant = Math.floor(row/3);
                    let colQuadrant = Math.floor(col/3);
                    if(board[row][col] === board[rowQuadrant*3 + r][colQuadrant*3 +c]) {
                        if(row !== rowQuadrant*3 + r && col !== colQuadrant*3 + c) {
                            errors[quadrant] = 1;
                        }
                    }
                }
            }
        }
    }
    if(Object.keys(errors).length === 0) {
        return 'legal';
    }
    return Object.keys(errors).join(',');
}
```

[⬆ back to top](#top)

## 41. Arith Geo -easy

```
*  take the array of
*  numbers stored in arr and return the string "Arithmetic" if the sequence follows    *
*  an arithmetic pattern or return "Geometric" if it follows a geometric pattern. If   *
*  the sequence doesn't follow either pattern return -1. An arithmetic sequence is     *
*  one where the difference between each of the numbers is consistent, where as in a   *
*  geometric sequence, each term after the first is multiplied by some constant or     *
*  common ratio. Arithmetic example: [2, 4, 6, 8] and Geometric                        *
*  example: [2, 6, 18, 54]. Negative numbers may be entered as parameters, 0 will not  *
*  be entered, and no array will contain all the same elements. 
```

```javascript
function ArithGeo(arr) { 
  var arithFlag = true, geoFlag = true;
  var diff = arr[1] - arr[0];
  for (var i = 2; i < arr.length; i++) {
    if ((arr[i] - arr[i-1]) !== diff) {
      arithFlag = false;
    }
  }
  if (arithFlag) {
    return "Arithmetic";
  }
  else { // check for geometric pattern
    diff = arr[1] / arr[0];
    for (var i = 2; i < arr.length; i++) {
      if ((arr[i] / arr[i-1]) !== diff) { 
        geoFlag = false;
      }
    }
    if (geoFlag) {
      return "Geometric";
    } else {
      return "-1";
    }
  }
}
```

[⬆ back to top](#top)

## 43. Min Window Substring -hard

```javascript
function MinWindowSubstring(s, t) {
    let map = new Map();
    for(let letter of t) {
        if(!map.has(letter)) {
            map.set(letter, 1);
        } else {
            map.set(letter, map.get(letter) + 1);
        }
    }
    let left = 0;
    let right = 0;
    let len = Infinity;
    let count = map.size;
    while(right < s.length) {
        let rLetter = s[right];
        if(map.has[rLetter])) {
            map.set(rLetter, map.get(rLetter) - 1);
            if(map.get(rLetter) === 0) count--;
        }
        right++;
        while(count === 0) {
            if(right-left < len) {
                len = right - left;
                minWIndow = s.slice(left, right);
            }
            let lLetter = s[left];
            if(map.has(lLetter)) {
                map.set(lLetter, map.get(lLetter) + 1);
                if(map.get(lLetter) > 0) count++;
            }
            left++;
        }
    }
    return minWindow;
}
```

- https://www.youtube.com/watch?v=z9e-tGD7Z8g

[⬆ back to top](#top)

## 44. First Reverse -easy

- "hello, world"   --> "dlrow, olleh"

```javascript
function FirstReverse(str) {
    var backwardStr = "";
    var splitString = str.split("");
    for(let i=splitString -1;i>= 0;i--) {
        backwardStr += splitString[i]
    }
    return backwardStr;
}
```

[⬆ back to top](#top)

## 45. Longest Word -easy

- "fun&!! time"   --> time
- "I love dogs"   --> love

```javascript
function LongestWord(str) {
    let arr = str.match(/[a-zA-Z]+/gi);
    let sorted = arr.sort(function(a, b) {
        return b.length -a.length;
    });
    str = sorted[0];
    return str;
}
```

[⬆ back to top](#top)

## 46. Product Digits -medium

- 234  --> 15, because: productDigit 2*3*4 = 24, sum 2+3+4 = 9, result 24-9 = 15

```javascript
function ProductDigits(n) {
    //turn digit into string
    let num = n.toString();
    let product = 1;
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
         //grab digit, turn it back into number
         let number = parseInt(num[i]);
         product *= number;
         sum += number;
      }
     return product - sum;
}
```

[⬆ back to top](#top)

## 47. Moving Median -medium

- [3,1,3,5,10,6,4,3,1]  -> 1,2,3,5,6,6,4,3
- [5,2,4,6]      ->   2,3,4
- [3,0,0,-2,0,2,0,-2]  ->  0,0,0,0,0,0,0
- []

```javascript
function findMovingMovingMedian(arr){
  //check edge cases
  let median = ''
  if(arr.length==0) return median;
  if(arr.length ==1) return arr[0];
  if(arr[0] < 0) return median;
  let n = arr[0]
  let newArr = arr.slice(1,arr.length)
  let j = 0;
  for(let i = 1;i<arr.length;i++){
    if(i<n){
      let window = newArr.slice(j,i)
      window = window.sort();
      median+= `${findMedian(window)},`
    }else {
      if(j + n < arr.length){
        let window = newArr.slice(j,j+n)
        window.sort(function(a, b) {
          return a - b;
        });
        median+= `${findMedian(window)},`
        j+=1
      }
    }
  }
  return median.slice(0,median.length-1)
}

function findMedian(arr){
  let median = ''
  if(arr.length == 1){
    median =  `${arr[0]}`
    return median
  }
  if(arr.length % 2 == 0){
    let mid = arr.length /2
    median  = `${ (arr[mid] + arr[mid-1] ) /2}`
  }
  if(arr.length % 2 != 0){
    let mid = (arr.length - 1) / 2 
    median  = `${arr[mid]}`
  }
  return median;
}
```

[⬆ back to top](#top)

## 48. Longest Matrix Path -medium

```
Input: ["12256", "56219", "43215"]
Output: 5
Input: ["67", "21", "45"]
Output: 3
```

```javascript
function findLongestPath(i, j, mat, dp) {
  if (i < 0 || i >= dp.length || j < 0 || j >= dp[i].length) {
    return 0;
  }
  if (dp[i][j] !== -1) {
    return dp[i][j];
  }
  let x = -1;
  let y = -1;
  let z = -1;
  let w = -1;
  if (j < dp[i].length - 1 && mat[i][j] < mat[i][j + 1]) {
    x = 1 + findLongestPath(i, j + 1, mat, dp);
  }
  if (j > 0 && mat[i][j] < mat[i][j - 1]) {
    y = 1 + findLongestPath(i, j - 1, mat, dp);
  }
  if (i > 0 && mat[i][j] < mat[i - 1][j]) {
    z = 1 + findLongestPath(i - 1, j, mat, dp);
  }
  if (i < dp.length - 1 && mat[i][j] < mat[i + 1][j]) {
    w = 1 + findLongestPath(i + 1, j, mat, dp);
  }
  dp[i][j] = Math.max(x, y, z, w, 1);
  return dp[i][j];
}
function LongestMatrixPath(strArr) { 
  const mat = strArr.map((el) => el.split(''));
  const dp = Array.from(Array(mat.length), () => new Array(mat[0].length).fill(-1));
  let result = 1;
  for (let i = 0; i < dp.length; i ++) {
    for (let j = 0; j < dp[i].length; j ++) {
      if (dp[i][j] === - 1) {
        findLongestPath(i, j, mat, dp);
      }
      result = Math.max(result, dp[i][j]);
    }
  }
  return result - 1;
}
```

- https://www.geeksforgeeks.org/longest-increasing-path-matrix/
- https://github.com/alphadev2018/coderbyte-js/blob/main/LongestMatrixPath/index.js

[⬆ back to top](#top)

## 49. Palindromic Substring -medium

- Have the function PalindromicSubstring(str) take the str parameter being passed and find the longest palindromic substring, which means the longest substring which is read the same forwards as it is backwards. For example: if str is "abracecars" then your program should return the string racecar because it is the longest palindrome within the input string.
- The input will only contain lowercase alphabetic characters. The longest palindromic substring will always be unique, but if there is none that is longer than 2 characters, return the string none.

```
Input: "hellosannasmith"
Output: sannas
Input: "abcdefgg"
Output: none
```

```javascript
function PalindromicSubstring(str) { 
  const n = str.length;
  const table = Array.from(Array(n), () => new Array(n).fill(false));
  let maxLength = 1;
  let start = 0;
  for (let i = 0; i < n; i ++) {
    table[i][i] = true;
    if (i < n - 1) {
      if (str[i] === str[i + 1]) {
        table[i][i + 1] = true;
        start = i;
        maxLength = 2;
      }
    }
  }

  for (let k = 3; k <= n; k ++) {
    for (let i = 0; i < n - k + 1; i ++) {
      let j = i + k - 1;

      if (table[i + 1][j - 1] && str[i] === str[j]) {
        table[i][j] = true;

        if (k > maxLength) {
          start = i;
          maxLength = k;
        }
      }
    }
  }
  if (maxLength > 2) {
    return str.substring(start, start + maxLength);
  }
  return "none";
}
```

[⬆ back to top](#top)

## 50. Preorder Traversal -medium

```javascript
function PreorderTraversal(root) {
    /**
    * Algorithm:
    * 1. Create an empty stack [];
    * 2. Do while stack is not empty:
    * 2.1. Pop an item from stack and add it to the 'result' array.
    * 2.2. Push 'right child' of popped item to stack.
    * 2.3. Push 'left child' of popped item to stack.
   */
   if (root == null) {
     return [];
   }
   const stack = [];
   const result = [];
   stack.push(root);
   while(stack.length > 0) {
     let current = stack.pop();
     result.push(current.val);
     if (current.right) stack.push(current.right);
     if (current.left) stack.push(current.left);
   }
   return result;
}
```

[⬆ back to top](#top)

## 51. Symmetric Tree -medium

```javascript
function SymmetricTree(root) {
  if (!root) return true;
  return helper(root.left, root.right);
};
var helper = function (p, q) {
  if ((!p && q) || (p && !q) || (p && q && p.val !== q.val)) return false;
  if (p && q) return helper(p.left, q.right) && helper(p.right, q.left);
  return true;
};
//
function SymmetricTree(root) {
    if (!root) return true;

  var p = [root.left];
  var q = [root.right];
  var ll = null;
  var rr = null;

  while (p.length && q.length) {
    ll = p.pop();
    rr = q.pop();

    if (!ll && !rr) continue;
    if (!ll || !rr) return false;
    if (ll.val !== rr.val) return false;

    p.push(ll.left);
    p.push(ll.right);
    q.push(rr.right);
    q.push(rr.left);
  }
  return true;
}
```

[⬆ back to top](#top)

## 52. Tree Constructor -medium

```javascript
function TreeConstructor(strArr) { 
 let parents={};
 let children={};

for(let i=0; i<strArr.length; i++){
    let pair = strArr[i].replace(/[()]/g,"").split(",");
    let child = pair[0];
    let parent = pair[1];
    
    if(parents[parent]){
       parents[parent].push(child);
    }else{
     parents[parent]=[child];
    }
    
    if(parents[parent].length > 2){
      return false;
    }
    
    if(children[child]){
     return false;
    } else {
       children[child]=parent;
    }
 }
 return true;
}
TreeConstructor(["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]);
```

[⬆ back to top](#top)

## 53. String Periods - medium

```javascript
const stringPeriods = str => {
  const { length } = str
  if (length > 1) {
    for (let i = Math.ceil(length/2); i > 1; i--) { {
      const substring = str.slice(0, i)
      const repeated = substring.repeat(length/i)

      if (repeated === str) {
        return substring
      }
    }
  }
  return '-1'
}
```

[⬆ back to top](#top)

## 54. Max Subarray -medium

```javascript
//
// input arr = [1, 4, 20, 3, 10, 5]
//  value = 33
// result = [3, 5]
// input arr = [1, 2, 3, 4, 5, 0, 0, 0, 0, 6, 7, 8, 9, 10]
//  value = 15
// result = [1, 8]
const arr = [1, 4, 20, 3, 10, 5]
const subArray = (arr, value) => {
  let sum = 0
  let right = 0
  let left = 0
  let result = [0, 0]

  while (right < arr.length) {
    sum += arr[right]
    while (left < right && sum > value) {
      sum -= arr[left++]
    }

    console.log(result.length, result[1], result[0], right, left)
    if (sum === value && (result.length === 1 || ((result[1] - result[0]) < (right - left)))) {
      result = [ left + 1, right + 1 ]
    }
    right++
  }
  console.log('largest sub array', result)
}
subArray(arr, 33)
//
const MaxSubarray = (nums) => {
  let maxSum = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    let currentSubArraySum = 0;
    for (let j = i; j < nums.length; j++) {
      currentSubArraySum += nums[j];
      maxSum = Math.max(maxSum, currentSubArraySum);
    }
  }
  return maxSum;
};
```

[⬆ back to top](#top)

## 55. meanMode

```javascript
/* https://coderbyte.com/question/mean-mode

*  Have the function MeanMode(arr) take the array of numbers stored in arr and         *
*  return 1 if the mode equals the mean, 0 if they don't equal each other              *
*  (ie. [5, 3, 3, 3, 1] should return 1 because the mode (3) equals the mean (3)).     *
*  The array will not be empty, will only contain positive integers, and will not      *
* contain more than one mode.                                                          *
*                                                                                      *
*  SOLUTION                                                                            *
*  Since it is possible that I will want a function that will calculate the mean or    *
*  mode in the future, I decided to create separate functions for each. The mean is    *
*  calculated by the average of all values in the array. The mode is the number that   *
*  exists the most in the array. My solution is to call my two functions and then      *
*  compare to see if they are equal and if so return 1 else return 0.                  *
*                                                                                      *
*  Steps for solution                                                                  *
*    1) Create separate functions for getMean and getMode                              *
*    2) Compare the values returned from the two functions                             *
*    3) If values are equal return 1 else return 0
*/

mean = arr => (arr.reduce((a, b) => a + b))/(arr.length);

// mode is just the problem of finding the element with greatest no of occurrence
mode = arr => {

    let obj = {}, max = 1, mode;

    for (let i of arr) {
        obj[i] = obj[i] || 0;
        obj[i]++
    }

    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if ( obj[i] > max ) {
                max = obj[i]
                mode = i;
            }
        }
    }
    return mode;
}
meanMode = arr => mean(arr) == mode(arr)
let myArr = [5, 3, 3, 3, 1]
console.log(mean(myArr))
console.log(mode(myArr))
console.log(meanMode(myArr))
```

[⬆ back to top](#top)

## 56. Array Challenge

```javascript
function ArrayChallenge(strArr) {
    let result = '';
    for (let index = 0; index < strArr[0].length; index++) {
        if (strArr[0][index] === '1' && strArr[0][index] === strArr[1][index]) return result += '1'
        else return result += '0'
    }
    return result;
}
```

[⬆ back to top](#top)

## 57. Palindrome Creator

```
Using the JavaScript language, have the function PalindromeCreator(str) take the str parameter being passed and determine if it is possible to create a palindromic string of at least 3 characters by removing 1 or 2 characters. For example: if str is "abjchba" then you can remove the characters jc to produce "abhba" which is a palindrome. For this example your program should return the two characters that were removed with no delimiter and in the order they appear in the string, so jc. If 1 or 2 characters cannot be removed to produce a palindrome, then return the string not possible. If the input string is already a palindrome, your program should return the string palindrome.

The input will only contain lowercase alphabetic characters. Your program should always attempt to create the longest palindromic substring by removing 1 or 2 characters (see second sample test case as an example). The 2 characters you remove do not have to be adjacent in the string.

Input:"mmop"
Output:"not possible"

Input:"kjjjhjjj"
Output:"k"
Hint
Try looping through the string and removing every character to see if it produces a palindrome. Then you can also try and remove different pairs of letters within the string as well.
```

```javascript
const isPalindrome = (str) => str === str.split('').reverse().join('')
function PalindromeCreator (str) {
  for (var i = 0; i < str.length; i++) {
    // str minus 1 char:
    let temp1 = str.slice(0, i)
    let temp2 = str.slice(i + 1)
    // let removedLetter = str[i]
    // console.log(removedLetter + '\n' + 'part 1:  ' + temp1, '\npart 2:  ' + temp2 + '\n')
    let tempStr = temp1 + temp2

    console.log(temp1, temp2, tempStr)
    if (isPalindrome(tempStr)) {
      return str[i]
    }
  }
}
```

[⬆ back to top](#top)

## tip

|tip|说明|
|---|---|
|isNaN("abc")|检测输入的是否为数字是数字则返回false,反之则为true|
|/\d+$/|数字，$最后一个|
|/[aeiou]/gi|i 忽略大小写|

[⬆ back to top](#top)

> reference
- [coderbyte-Beginner](https://github.com/ratracegrad/coderbyte-Beginner/tree/master)
- [CoderByte-Medium-Problems](https://github.com/jackmcd4/CoderByte-Medium-Problems/tree/master)
- [CoderByte-Easy-Problems](https://github.com/jackmcd4/CoderByte-Easy-Problems)
- https://appdev4tech.com/
- https://coderbyte.com/video/step-walking-solution
- https://github.com/KaylaKremer/CoderbyteReact/tree/main
- https://javascript.plainenglish.io/javascript-algorithms-maximum-subarray-leetcode-15812b95bc4
- https://coderbyte.com/interview-kit/algorithms
