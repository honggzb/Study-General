//1)  arguments object - no longer bound with arrow function

const add = function(a, b) {
    console.log(arguments);
    return a+b;
}
//arguments(3)
// const add = (a, b) => {
//     console.log(arguments);
//     return a+b;
// }
// will return error if use arrow function
console.log(add(55,1, 1001));

//2) this keyword- no longer bound
const user = {
    name: 'abc',
    cities: ['a', 'b', 'c'],
    printPlaceLived: function() {
        const that = this;
        console.log(this.name);
        console.log(this.cities);
        // this.cities.forEach(function(item) {
        //     //console.log(this.name + ' has lived in ' + item);
        //     //Uncaught TypeError: Cannot read property 'name' of undefined
        //     //workaround 1:  in line 20 by using that
        //     console.log(that.name + ' has lived in ' + item);
        // })
        // workaround 2: using arrow function
        this.cities.forEach((item) => {
            //console.log(this.name + ' has lived in ' + item);
            //Uncaught TypeError: Cannot read property 'name' of undefined
            //workaround 1:  in line 20 by using that
            console.log(this.name + ' has lived in ' + item);
        })
    }
};
user.printPlaceLived();

// challenge area

const multiplier = {
    numbers: [10, 20, 30], //numbers - array of numbers
    multiplyBy: 3, //multiplyBy - singe number
    //multiply -return a new array where the number have been multiplied
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
      }
}

console.log(multiplier.multiply()); ///
