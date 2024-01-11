/*
return the first word with the greatest repeated letters
"Today, it the greatest day ever!" -> greatest(have 2 e)
"Hello apple pie" -> return hello
"No word" -> return -1
*/
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
