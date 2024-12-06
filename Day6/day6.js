// @ts-check
'use strict';

const fs = require('fs');

const FILE = 'data.txt';

function main() {
    const map = getMap(FILE);
    const guard = createGuard(map);

    console.log('Part1');
    run(map, guard);
    console.log(guard.visited.size);

    console.log('Part2');
    const positions = runPart2(map);
    console.log(positions);

    // printGuard(guard);
    // printMap(map);
}

/**
 * 
 * @param {Object} map 
 * @param {Object} guard 
 */
function run(map, guard) {
    while (!guard.leftTheMap) {
        move(map, guard);
    }
}

/**
 * 
 * @param {Object} map 
 * @returns {Number}
 */
function runPart2(map) {
    let positions = 0;

    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const guard = createGuard(map);

            if (map.grid[y][x] === '#' || map.grid[y][x] === '^') {
                continue;
            }
            map.grid[y][x] = '#';

            let loop = false;
            while (!guard.leftTheMap) {
                loop = move(map, guard, true);
                if (loop) {
                    break;
                }
            }

            if (loop) {
                positions++;
            }

            map.grid[y][x] = '.';
        }
    }

    return positions;
}

/**
 * 
 * @param {Object} map 
 * @param {Object} guard 
 * @returns {Boolean}
 */
function move(map, guard, checkForLoop = false) {
    switch (guard.direction) {
        case 'up':
            if (checkCollision(map, guard)) {
                guard.direction = 'right';
                if (checkForLoop) {
                    if (checkRepeat(guard)) {
                        return true;
                    }
                    guard.dirYX.get('right').add(posToString(guard.posY, guard.posX));
                }
            } else {
                guard.posY -= 1;
                if (!checkForLoop) {
                    guard.visited.add(posToString(guard.posY, guard.posX));
                }
            }
            break;
        case 'right':
            if (checkCollision(map, guard)) {
                guard.direction = 'down';
                if (checkForLoop) {
                    if (checkRepeat(guard)) {
                        return true;
                    }
                    guard.dirYX.get('down').add(posToString(guard.posY, guard.posX));
                }
            } else {
                guard.posX += 1;
                if (!checkForLoop) {
                    guard.visited.add(posToString(guard.posY, guard.posX));
                }
            }
            break;
        case 'down':
            if (checkCollision(map, guard)) {
                guard.direction = 'left';
                if (checkForLoop) {
                    if (checkRepeat(guard)) {
                        return true;
                    }
                    guard.dirYX.get('left').add(posToString(guard.posY, guard.posX));
                }
            } else {
                guard.posY += 1;
                if (!checkForLoop) {
                    guard.visited.add(posToString(guard.posY, guard.posX));
                }
            }
            break;
        case 'left':
            if (checkCollision(map, guard)) {
                guard.direction = 'up';
                if (checkForLoop) {
                    if (checkRepeat(guard)) {
                        return true;
                    }
                    guard.dirYX.get('up').add(posToString(guard.posY, guard.posX));
                }
            } else {
                guard.posX -= 1;
                if (!checkForLoop) {
                    guard.visited.add(posToString(guard.posY, guard.posX));
                }
            }
            break;

        default:
            break;
    }

    return false;
}

/**
 * 
 * @param {Object} map 
 * @param {Object} guard 
 * @returns {Boolean}
 */
function checkCollision(map, guard) {
    const posY = guard.posY;
    const posX = guard.posX;
    const grid = map.grid;

    switch (guard.direction) {
        case 'up':
            if (posY === 0) {
                guard.leftTheMap = true;
                return true;
            }
            if (grid[posY - 1][posX] === '#') {
                return true;
            }
            break;
        case 'right':
            if (posX >= map.width - 1) {
                guard.leftTheMap = true;
                return true;
            }
            if (grid[posY][posX + 1] === '#') {
                return true;
            }
            break;
        case 'down':
            if (posY >= map.height - 1) {
                guard.leftTheMap = true;
                return true;
            }
            if (grid[posY + 1][posX] === '#') {
                return true;
            }
            break;
        case 'left':
            if (posX === 0) {
                guard.leftTheMap = true;
                return true;
            }
            if (grid[posY][posX - 1] === '#') {
                return true;
            }
            break;

        default:
            return false;
    }
    return false;
}

/**
 * 
 * @param {Object} guard 
 * @returns {Boolean}
 */
function checkRepeat(guard) {
    const dirYX = guard.dirYX.get(guard.direction);

    if (dirYX.has(posToString(guard.posY, guard.posX))) {
        return true;
    }

    return false;
}

/**
 * 
 * @param {String} file 
 * @returns {Object}
 */
function getMap(file) {
    const map = {};

    const grid = fs.readFileSync(file, 'utf-8').split('\r\n').map(line => line.split(''));
    map.grid = grid;
    map.height = grid.length;
    map.width = grid[0].length;

    return map;
}

/**
 * 
 * @param {Object} map 
 */
function printMap(map) {
    console.log(`h: ${map.height} w: ${map.width}`);
    console.table(map.grid);
}

/**
 * 
 * @param {Object} map 
 * @returns {Object}
 */
function createGuard(map) {
    const [y, x] = getStartPos(map);

    const visited = new Set();
    visited.add(posToString(y, x));

    const dirYX = new Map();
    dirYX.set('up', new Set());
    dirYX.set('right', new Set());
    dirYX.set('down', new Set());
    dirYX.set('left', new Set());
    dirYX.get('up').add(posToString(y, x));

    const guard = {
        posY: y,
        posX: x,
        visited: visited,
        direction: 'up',
        dirYX: dirYX,
        leftTheMap: false,
    };

    return guard;
}

/**
 * 
 * @param {Object} guard 
 */
function printGuard(guard) {
    console.log(`pos: ${guard.posY}, ${guard.posX}`);
    console.log(`dir: ${guard.direction}`);
    console.log('visited:');
    console.table(guard.visited);
}

/**
 * 
 * @param {Object} map 
 * @returns {Array}
 */
function getStartPos(map) {
    const grid = map.grid;

    for (let y = 0; y < map.height; y++) {
        const x = grid[y].indexOf('^');

        if (x >= 0) {
            return [y, x];
        }
    }

    return [];
}

/**
 * 
 * @param {Number} y 
 * @param {Number} x 
 * @returns {String}
 */
function posToString(y, x) {
    return `${y},${x}`;
}

main();
