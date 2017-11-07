[Javascript中的setTimeout和setInterval的一些注意事项](#top)

- [delay of zero](#topic1)
- [Passing Arguments to setTimeout and setInterval-传参给setTimeout和setInterval](#topic2)
- [setTimeout和setInterval的this问题](#topic3)
- [Browser compatibility](#topic4)

<h2 id="topic1">delay of zero</h2>

```javascript
function foo() {
  console.log('foo has been called');
}
setTimeout(foo, 0);
console.log('After setTimeout');
/*
After setTimeout
foo has been called
*/
```

> even though setTimeout was called with a delay of zero, it placed on a queue and scheduled to run at the next opportunity; not **immediately**. Currently-executing code must complete before functions on the queue are executed, thus the resulting execution order may not be as expected

[back to top](#top)

<h2 id="topic2">Passing Arguments to setTimeout and setInterval</h2>

- In modern browsers, the "setTimeout" receives a third parameter that is sent as parameter to the internal function at the end of the timer(Acording to https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout the callback arguments for Internet Explorer is only supported in versions >=10)

> setTimeout(yourFunctionReference, 4000, param1, param2, paramN);

```javascript
// setTimeout with a third parmameter
var hello = "Hello World";
setTimeout(alert, 1000, hello);
```

[back to top](#top)

<h2 id="topic3">setTimeout和setInterval的this问题</h2>

- The default **this** value of a setTimeout callback will still be the **window** object, and not undefined, even in strict mode.
- Example using bind(), JavaScript 1.8.5 introduced the Function.prototype.bind() method to set the value of this for all calls to a given function

```javascript
myArray = ['zero', 'one', 'two'];
myArray.myMethod = (function (sProperty) {
    console.log(arguments.length > 0 ? this[sProperty] : this);
}).bind(myArray);
myArray.myMethod(); // prints "zero,one,two" because 'this' is bound to myArray in the function
myArray.myMethod(1); // prints "one"
setTimeout(myArray.myMethod, 1000); // still prints "zero,one,two" after 1 second because of the binding
setTimeout(myArray.myMethod, 1500, "1"); // prints "one" after 1.5 seconds
```

[bind案例说明](https://stackoverflow.com/questions/1190642/how-can-i-pass-a-parameter-to-a-settimeout-callback)

```javascript
var testObject = { prop1: 'test1', prop2: 'test2', prop3: 'test3'};
// method 1: use forEach and Object.keys
Object.keys(testObject).forEach(function(propertyName, i) {
    setTimeout(function() {
        console.log(testObject[propertyName]);
    }, i * 1000);
});
// method 2: use bind
var i = 0;
for (var propertyName in testObject) {
    setTimeout(function(propertyName) {
        console.log(testObject[propertyName]);
    }.bind(this, propertyName), i++ * 1000);
}
//method 3: use IIFE
var i = 0;
for (var propertyName in testObject) {
    setTimeout((function(propertyName) {
        return function() {
            console.log(testObject[propertyName]);
        };
    })(propertyName), i++ * 1000);
}
//method 4: passing third parameter if IE>10
var i = 0;
for (var propertyName in testObject) {
    setTimeout(function(propertyName) {
        console.log(testObject[propertyName]);
    }, i++ * 1000, propertyName);
}
//method 5: use arrow function of ES6 in modern browser
let i = 0;
for (let propertyName in testObject) {
    setTimeout(() => console.log(testObject[propertyName]), i++ * 1000);
}
```

[back to top](#top)

<h2 id="topic4">Browser compatibility</h2>

Browser compatibility(Desktop)

| Feature|Chrome|Edge|Firefox (Gecko)|Internet Explorer|Opera|Safari|
| :---| :---| :---| :---| :---| :---| :---|
|Basic support|1.0|(Yes)|1.0(1.7 or earlier)|4.0|4.0|1.0|
|Supports parameters for callback|(Yes)|(Yes)|(Yes)|10.0|(Yes)|(Yes)|
|Throttling of tracking timeout scripts|?|?|55(55)|?|?|?|

Browser compatibility(Mobile)

| Feature|Android|Chrome for Android|Edge|Firefox Mobile (Gecko)|IE Mobile|Opera Mobile|Safari Mobile|
| :---| :---| :---| :---| :---| :---| :---| :---|
|Basic support|1.0|1.0|(Yes)|1.0 (1) 52.0 (52)|6.0|6.0|1.0|
|Supports parameters for callback|?|?|?|?|?|?|?|
|Throttling of tracking timeout scripts|?|?|?|55(55)|?|?|?|

[back to top](#top)

- https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers.setTimeout
- [Passing Arguments to setTimeout and setInterval](http://arguments.callee.info/2008/11/10/passing-arguments-to-settimeout-and-setinterval/)
