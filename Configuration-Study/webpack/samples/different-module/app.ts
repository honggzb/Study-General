//import "babel-polyfill";

const NUM = 45;

interface Cat {
    name: string,
    gender: string
}

function touchCat(cat: Cat) {
    console.log('miao ~~~', cat.name);
}

touchCat({
    name: 'tom',
    gender: 'tom'
})

// use ES6/7
let func = () => {};
let arr = [1,2,4];
let arrB = arr.map(item => item*2 );
console.log(arrB);

// use generate

function* funcP() {

}
