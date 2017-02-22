自定义的reduce, filter, find功能，可以避免写很多的loop

```javascript
const heroes = [
    {name: 'Hulk', strength: 90000, sex: 'm'},
    {name: 'Spider-Man', strength: 25000, sex: 'm'},
    {name: 'Hawk Eye', strength: 136, sex: 'm'},
    {name: 'Thor', strength: 100000, sex: 'm'},
    {name: 'Black Widow', strength: 136, sex: 'f'},
    {name: 'Vision', strength: 5000, sex: 'm'},
    {name: 'Scarlet Witch', strength: 60, sex: 'f'},
    {name: 'Mystique', strength: 120, sex: 'f'},
    {name: 'Namora', strength: 75000, sex: 'f'},
];

function greaterStrength(champion, contender) {
    return (contender.strength > champion.strength) ? contender : champion;
}
function addStrength(tally, hero) {
    return tally + hero.strength;
}
function isFemaleHero(hero) {
    return (hero.sex === 'f');
}
function isSuperhuman(hero) {
    return (hero.strength >= 500);
}
function isBlackWidow(hero) {
    return (hero.name === 'Black Widow');
}

function reduce(f, initialVal, a){
  let working = initialVal;
  for(item of a){
    working = f(working, item);
  }
  return working;
}
function filter(predicate, arr) {
    let working = [];
    for (let item of arr) {
        if (predicate(item)) {
            working = working.concat(item);
        }
    }
}
function find(predicate, arr) {
    for (let item of arr) {
        if (predicate(item)) {
            return item;
        }
    }
}

const strongestHero = heroes.reduce(greaterStrength, {strength: 0});
const combinedStrength = heroes.reduce(addStrength, 0);
const femaleHeroes = filter(isFemaleHero, heroes);   // heroes.filter(isFemaleHero);
const superhumans  = filter(isSuperhuman, heroes);   // heroes.filter(isSuperhuman);
const blackWidow = heroes.find(isBlackWidow);
```
