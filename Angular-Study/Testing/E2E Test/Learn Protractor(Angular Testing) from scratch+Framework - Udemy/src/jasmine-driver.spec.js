var using = require('jasmine-data-provider');

// describe('test subtraction with data provider - direct array', function () {
//     using([{a: 5, b: 2, expected: 3}, {a: 25, b: 26, expected: -1}], function (data) {
//         it('should calc with operator -', function () {
//             var result =data.a-data.b;
//             console.log(result);
//             expect(result).toEqual(data.expected);
//         });
//     });
// });

describe('test addition with data provider - provider function', function () {
    // function plusProvider() {
    //     return [
    //         {a: 2, b: 3, expected: 5},
    //         {a: 14, b: 15, expected: 29},
    //         {a: 12, b: 13, expected: 25},
    //         {a: 22, b: 13, expected: 35},
    //     ];
    // }

    var objectDataProvider = {
        'First one is awesome!': {a: 6, b: 3, expected: 9},
        'Second test should fail': {a: 8, b: 1, expected: 10}
    };

    //using(plusProvider, function (data) {
    using(objectDataProvider, function (data, description) {
        //it('should calc with operator +', function () {
        it(description, function () {
            var result = data.a+data.b;
            console.log(result);
            expect(result).toEqual(data.expected);
        });
    });
});