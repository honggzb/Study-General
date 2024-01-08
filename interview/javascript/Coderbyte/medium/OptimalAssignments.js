/*
Have the function OptimalAssignments(strArr) read strArr which will represent an NxN matrix and it will be in the following format: ["(n,n,n...)","(...)",...] 
where the n's represent integers. This matrix represents a machine at row i performing task at column j. 
The cost for this is matrix[i][j]. Your program should determine what machine should perform what task so as to minimize the whole cost 
and it should return the pairings of machines to tasks in the following format: (i-j)(...)... 
Only one machine can perform one task. For example: if strArr is ["(5,4,2)","(12,4,3)","(3,4,13)"] 
then your program should return (1-3)(2-2)(3-1) because assigning the machines to these tasks gives the least cost. 
The matrix will range from 2x2 to 6x6, there will be no negative costs in the matrix, and there will always be a unique answer.

Input: ["(1,2,1)","(4,1,5)","(5,2,1)"]
Output: (1-1)(2-2)(3-3)

Input: ["(13,4,7,6)","(1,11,5,4)","(6,7,2,8)","(1,3,5,9)"]
Output: (1-2)(2-4)(3-3)(4-1)
*/


function getCost(m, mCosts) {
  return m.reduce(
    (acc, cur, idx) => acc + mCosts[idx][cur], 0);
}

function* getMatches(els) {
  if (els.length === 1) {
    yield els;
    return;
  }

  for (let m of getMatches(els.slice(1))) {
    for (let i = 0; i <= m.length; i ++) {
      yield m.slice(0, i)
      .concat([els[0]])
      .concat(m.slice(i));
    }
  }
}

function OptimalAssignments(strArr) { 
    const mCosts = strArr.map(line => line.replace(/^\(|\)$/g, ''))
    .map(line => line.split(/,/)
    .map(i => parseInt(i, 10)));
    let bestCost = Number.MAX_SAFE_INTEGER;
    let bestM = undefined;

    for (var m of getMatches(mCosts.map((_, i) => i))) {
        const cost = getCost(m, mCosts);
        if (cost < bestCost) {
            bestCost = cost;
            bestM = m.slice(0);
        }
    }

    return bestM.map((t, i) => `(${i+1}-${t+1})`).join('');
}   































*/
