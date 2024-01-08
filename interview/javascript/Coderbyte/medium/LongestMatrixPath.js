/*
Input: ["12256", "56219", "43215"]
Output: 5
Input: ["67", "21", "45"]
Output: 3
*/

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
