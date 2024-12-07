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
 * @param {Boolean} combinator
 * @returns {Number}
 */
function run(lines, combinator = false) {
    let sum = 0;

    for (const line of lines) {
        const answer = line[0];
        const values = line.slice(1);
        const delimCount = values.length - 1;

        const combinations = getCombinations(delimCount, combinator);

        for (const combination of combinations) {
            let result = values[0];

            for (let i = 1; i < values.length; i++) {
                result = calculate(result, values[i], combination[i - 1]);
            }

            if (result == answer) {
                sum += answer;
                break;
            }
        }
    }

    return sum;
}

/**
 * 
 * @param {Number} delimCount 
 * @param {Boolean} combinator
 * @returns {Array}
 */
function getCombinations(delimCount, combinator) {
    const combinations = ['+', '*'];

    if (combinator) {
        combinations.push('|');
    }

    for (let i = 0; i < delimCount - 1; i++) {
        const length = combinations.length;

        for (let j = 0; j < length; j++) {
            if (combinator) {
                const col = combinations[j] + '|';
                combinations.push(col);
            }

            const mul = combinations[j] + '*';
            combinations[j] += '+';
            combinations.push(mul);
        }
    }

    return combinations;
}

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
