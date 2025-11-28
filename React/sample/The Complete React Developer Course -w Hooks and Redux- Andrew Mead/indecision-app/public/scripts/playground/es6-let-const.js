'use strict';

//1)  arguments object - no longer bound with arrow function

var add = function add(a, b) {
    console.log(arguments);
    return a + b;
};
//arguments(3)
// const add = (a, b) => {
//     console.log(arguments);
//     return a+b;
// }
// will return error if use arrow function
console.log(add(55, 1, 1001));

//2) this keyword- no longer bound
var user = {
    name: 'abc',
    cities: ['a', 'b', 'c'],
    printPlaceLived: function printPlaceLived() {
        var _this = this;

        var that = this;
        console.log(this.name);
        console.log(this.cities);
        // this.cities.forEach(function(item) {
        //     //console.log(this.name + ' has lived in ' + item);
        //     //Uncaught TypeError: Cannot read property 'name' of undefined
        //     //workaround 1:  in line 20 by using that
        //     console.log(that.name + ' has lived in ' + item);
        // })
        // workaround 2: using arrow function
        this.cities.forEach(function (item) {
            //console.log(this.name + ' has lived in ' + item);
            //Uncaught TypeError: Cannot read property 'name' of undefined
            //workaround 1:  in line 20 by using that
            console.log(_this.name + ' has lived in ' + item);
        });
    }
};
user.printPlaceLived();

// challenge area

var multiplier = {
    numbers: [10, 20, 30], //numbers - array of numbers
    multiplyBy: 3, //multiplyBy - singe number
    //multiply -return a new array where the number have been multiplied
    multiply: function multiply() {
        var _this2 = this;

        return this.numbers.map(function (number) {
            return number * _this2.multiplyBy;
        });
    }
};

console.log(multiplier.multiply()); ///
