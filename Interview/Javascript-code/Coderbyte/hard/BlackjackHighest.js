/*
blackjack: numbers add up to 21

- the full list of possilbilities for str is : "two,three,four,five,six,seven,eight,nine,ten,jack,queen,king,ace" 
- output should be:  "below,above,or blackjack"

["four", "ten", "king"] -> above king
["four", "ace", "ten"] -> below ten
["ace", "queen"] -> blackjack ace
*/

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
