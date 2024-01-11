/*
[3,1,3,5,10,6,4,3,1] -> 1,2,3,5,6,6,4,3
[5,2,4,6] -> 2,3,4
[3,0,0,-2,0,2,0,-2] -> 0,0,0,0,0,0,0
[]
*/
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
