/*
check if first element can be split into 2 words, where both exist in second element
["baseball", "a,all,b,ball,bas,base,cat,code,d,e,quit"] --> base,ball
["abcgefd", "a,ab,abc,abcg,b,c,dog,e,efd,zzzz"] -->abcg,efd
*/

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
