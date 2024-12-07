// @ts-check
'use strict';

const fs = require('fs');

const FILE = './data.txt';

main();

function main() {
    const lines = getData(FILE);

    console.log('Part 1');
    const sumPart1 = run(lines);
    console.log(sumPart1);

    console.log('Part 2');
    const sumPart2 = run(lines, true);
    console.log(sumPart2);
}

/**
 * 
 * @param {Array} lines 
 * @param {Boolean} part2
 * @returns {Number}
 */
function run(lines, part2 = false) {
    let sum = 0;

    for (const line of lines) {
        const answer = line[0];
        const values = line.slice(1);

        if (add(answer, 0, values, part2)) {
            sum += answer;
        }
    }

    return sum;
}

/**
 * 
 * @param {Number} answer 
 * @param {Number} result 
 * @param {Array.<Number>} values 
 * @param {Boolean} part2 
 * @returns {Boolean}
 */
function add(answer, result, values, part2) {
    if (values.length === 0) {
        if (result === answer) {
            return true;
        }
        return false;
    }

    result = calculate(result, values[0], '+');
    values = values.slice(1);

    return add(answer, result, values, part2)
        || mul(answer, result, values, part2)
        || (part2 ? comb(answer, result, values, part2) : false);
}

/**
 * 
 * @param {Number} answer 
 * @param {Number} result 
 * @param {Array.<Number>} values 
 * @param {Boolean} part2 
 * @returns {Boolean}
 */
function mul(answer, result, values, part2) {
    if (values.length === 0) {
        if (result === answer) {
            return true;
        }
        return false;
    }

    result = calculate(result, values[0], '*');
    values = values.slice(1);

    return add(answer, result, values, part2)
        || mul(answer, result, values, part2)
        || (part2 ? comb(answer, result, values, part2) : false);
}

/**
 * 
 * @param {Number} answer 
 * @param {Number} result 
 * @param {Array.<Number>} values 
 * @param {Boolean} part2 
 * @returns {Boolean}
 */
function comb(answer, result, values, part2) {
    if (values.length === 0) {
        if (result === answer) {
            return true;
        }
        return false;
    }

    result = calculate(result, values[0], '|');
    values = values.slice(1);

    return add(answer, result, values, part2)
        || mul(answer, result, values, part2)
        || (part2 ? comb(answer, result, values, part2) : false);
}

/**
 * 
 * @param {Number} result 
 * @param {Number} value 
 * @param {String} delimeter 
 * @returns {Number}
 */
function calculate(result, value, delimeter) {
    if (delimeter === '+') {
        return result += value;
    }

    if (delimeter === '|') {
        return Number(String(result) + String(value));
    }

    return result *= value;
}

/**
 * 
 * @param {String} file 
 * @returns {Array}
 */
function getData(file) {
    return fs.readFileSync(file, 'utf-8')
        .split('\r\n')
        .map(line => line
            .split(/:?\s/)
            .map(Number));
}
