// @ts-check
'use strict';

const fs = require('fs');

const file = './Day2/data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\r\n');

let safe_reports = 0;

for (const line of lines) {
    let levels = line.split(' ').map(Number);

    let safe = check_levels(levels);

    // This is for part 2
    if (!safe) {
        // Loop through the levels removing them one by one and checking for safety again
        for (let i = 0; i < levels.length; i++) {
            // Copy the array to the splice does not affect the original one
            let level_removed = [...levels];
            level_removed.splice(i, 1);

            safe = check_levels(level_removed);

            // If we can find an array that is safe with one level removed the report is safe
            if (safe) {
                break;
            }
        }
    }

    if (safe) {
        safe_reports++;
    }
}

console.log(safe_reports);

function check_levels(levels) {
    let safe = true;

    // Check if if the levels should be increasing or decreasing
    let increasing = levels[0] < levels[1];

    for (let i = 0; i < levels.length - 1; i++) {

        let level1 = levels[i];
        let level2 = levels[i + 1];

        // Check the safety of two neighboring levels
        safe = check_safety(level1, level2, increasing);

        // If the check return false the report is unsafe
        if (!safe) {
            return safe;
        }
    }

    return safe;
}

function check_safety(level1, level2, increasing) {
    let difference = level1 - level2;

    if (increasing && difference > 0) {
        return false;
    } else if (!increasing && difference < 0) {
        return false;
    }

    difference = Math.abs(difference);

    if (difference < 1 || difference > 3) {
        return false;
    }
    return true;
}