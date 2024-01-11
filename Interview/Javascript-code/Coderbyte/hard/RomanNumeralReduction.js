/*
input is roman numerals in decreasin order, I for 1, V for 5, L for 50, C for 100, D for 500, M for 1000
return same number
"XXXVVIIIIIIIIII" -> L
"DDLL" -> MC
*/

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
