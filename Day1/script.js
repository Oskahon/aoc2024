const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\r\n');

const list1 = [];
const list2 = [];

lines.forEach(line => {
    const [id1, id2] = line.split('   ');
    list1.push(Number(id1));
    list2.push(Number(id2));
});

list1.sort();
list2.sort();

let sum = 0;

list1.forEach((val, i) => {
    sum += Math.abs(val - list2[i]);
});

console.log('Part1 result:');
console.log(sum);

const appearances = new Map();

list2.forEach(n => {
    // increment the value of key n or set it to 0 if it does not exist
    appearances.set(n, (appearances.get(n) ?? 0) + 1);
});

let similarity = 0;

list1.forEach(n => {
    // multiply the value of n with the amount of appearances in list2 or 0 if none found
    similarity += n * (appearances.get(n) ?? 0);
});

console.log('Part2 result:');
console.log(similarity);