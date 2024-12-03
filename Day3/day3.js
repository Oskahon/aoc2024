// @ts-check
'use strict';

const fs = require('fs');

const FILE = 'test2.txt';

function getData(file) {
    const data = fs.readFileSync(file, 'utf-8').replaceAll('\r\n', '');
    return data;
}

// Use regex to get the enabled parts of the data
// Done in three parts:
// Get the data from start to the first do() or don't()
// Get the data from the last do() until the end of data if there are no don't() instructions after it
// Get all slices of data between do() and don't() instructions
// Return the enabled parts of data joined together into a single string

function getEnabled(data) {
    const enabled = [];
    let match = [];

    // Find the substring ending at the first do() or don't()
    const reStart = /^.*?(?:do\(\)|don't\(\))/;
    match = data.match(reStart);
    if (match) {
        enabled.push(match);
    }

    // Find all substrings starting with do() and ending with don't()
    const re = /do\(\).*?don't\(\)/g;
    match = data.match(re);
    if (match) {
        enabled.push(match);
    }

    // Find the substring starting with the last do() as long as there is no don't() before the end of line
    const reEnd = /do\(\)(?!.*don't\(\)).*/;
    match = data.match(reEnd);
    if (match) {
        enabled.push(match);
    }

    return enabled.flat().join('');
}

// Use regex to find the valid instructions from the data
// Valid: mul(X,Y) where X and Y are 1-3 digit numbers
// The lines of data are joined into a single string

function getValid(data) {
    const re = new RegExp(/mul\(\d{1,3},\d{1,3}\)/, 'g');
    const valid = data.match(re);

    return valid;
}

// Get the X and Y values from the valid instructions with regex

function getValues(valid) {
    const re = new RegExp(/\d+/, 'g');
    const values = [];

    for (const ins of valid) {
        values.push(ins.match(re).map(Number));
    }

    return values;
}

// Multiply the two values
// Sum all the multiplication together for the answer to part 1

function multiplyAndSum(values) {
    let sum = 0;

    for (const pair of values) {
        sum += pair[0] * pair[1];
    }

    return sum;
}


const data = getData(FILE);
// enabled needed for part 2
const enabled = getEnabled(data);
// swap enabled with data for part 1
const valid = getValid(enabled);
const values = getValues(valid);
const sumOfMultiplications = multiplyAndSum(values);

console.log(sumOfMultiplications);