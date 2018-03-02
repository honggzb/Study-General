console.log('Starting App');
setTimeout(function() {
  console.log('Inside of callback');
}, 1000);
setTimeout(function() {
  console.log('second setTimeout');
}, 0);
console.log('Ending App');
/*
output is : 
Starting App
Ending App
second setTimeout
Inside of callback
*/