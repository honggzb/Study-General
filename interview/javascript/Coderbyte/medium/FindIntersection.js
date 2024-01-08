/*
["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"] --> 1,4,13
["1, 3, 9, 10, 17, 18", "1, 4, 9, 10"] --> 1,9,10
*/

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
