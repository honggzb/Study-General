/*
input <-- will be an integer ranging from 1 to 250, and
return <-- an integer output that will specify the least number of coins(1, 5, 7, 9, 11)
16 -> 2, because 9 + 7 = 16
25 -> 3, because 11 + 9 + 5 = 25
*/

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
