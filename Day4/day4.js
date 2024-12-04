// @ts-check
'use strict';

const fs = require('fs');

const FILE = 'data.txt';

function getGrid(file) {
    const grid = fs.readFileSync(file, 'utf-8').split('\r\n').map(line => line.split(''));

    return grid;
}

// Part 1:
function searchXMAS(grid) {
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;

    let count = 0;

    for (let posY = 0; posY < gridHeight; posY++) {
        for (let posX = 0; posX < gridWidth; posX++) {
            if (grid[posY][posX] === 'X') {
                count += searchForwards(posY, posX, gridWidth, grid) ? 1 : 0;
                count += searchBackwards(posY, posX, grid) ? 1 : 0;
                count += searchUp(posY, posX, grid) ? 1 : 0;
                count += searchDown(posY, posX, gridHeight, grid) ? 1 : 0;
                count += searchUpRight(posY, posX, gridWidth, grid) ? 1 : 0;
                count += searchUpLeft(posY, posX, grid) ? 1 : 0;
                count += searchDownRight(posY, posX, gridHeight, gridWidth, grid) ? 1 : 0;
                count += searchDownLeft(posY, posX, gridHeight, grid) ? 1 : 0;
            }
        }
    }

    return count;
}

function searchForwards(posY, posX, gridWidth, grid) {
    if (posX < gridWidth - 3) {
        return grid[posY][posX + 1] === 'M' && grid[posY][posX + 2] === 'A' && grid[posY][posX + 3] === 'S';
    }

    return false;
}

function searchBackwards(posY, posX, grid) {
    if (posX > 2) {
        return grid[posY][posX - 1] === 'M' && grid[posY][posX - 2] === 'A' && grid[posY][posX - 3] === 'S';
    }

    return false;
}

function searchUp(posY, posX, grid) {
    if (posY > 2) {
        return grid[posY - 1][posX] === 'M' && grid[posY - 2][posX] === 'A' && grid[posY - 3][posX] === 'S';
    }

    return false;
}

function searchDown(posY, posX, gridHeight, grid) {
    if (posY < gridHeight - 3) {
        return grid[posY + 1][posX] === 'M' && grid[posY + 2][posX] === 'A' && grid[posY + 3][posX] === 'S';
    }

    return false;
}

function searchUpRight(posY, posX, gridWidth, grid) {
    if (posY > 2 && posX < gridWidth - 3) {
        return grid[posY - 1][posX + 1] === 'M' && grid[posY - 2][posX + 2] === 'A' && grid[posY - 3][posX + 3] === 'S';
    }

    return false;
}

function searchUpLeft(posY, posX, grid) {
    if (posY > 2 && posX > 2) {
        return grid[posY - 1][posX - 1] === 'M' && grid[posY - 2][posX - 2] === 'A' && grid[posY - 3][posX - 3] === 'S';
    }

    return false;
}

function searchDownRight(posY, posX, gridHeight, gridWidth, grid) {
    if (posY < gridHeight - 3 && posX < gridWidth - 3) {
        return grid[posY + 1][posX + 1] === 'M' && grid[posY + 2][posX + 2] === 'A' && grid[posY + 3][posX + 3] === 'S';
    }

    return false;
}

function searchDownLeft(posY, posX, gridHeight, grid) {
    if (posY < gridHeight - 3 && posX > 2) {
        return grid[posY + 1][posX - 1] === 'M' && grid[posY + 2][posX - 2] === 'A' && grid[posY + 3][posX - 3] === 'S';
    }

    return false;
}

// Part2:
function searchMAS(grid) {
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;

    let count = 0;

    for (let posY = 0; posY < gridHeight; posY++) {
        for (let posX = 0; posX < gridWidth; posX++) {
            if (grid[posY][posX] === 'M') {
                count += searchMASForward(posY, posX, gridHeight, gridWidth, grid) ? 1 : 0;
                count += searchMASBackward(posY, posX, gridHeight, grid) ? 1 : 0;
                count += searchMASUp(posY, posX, gridWidth, grid) ? 1 : 0;
                count += searchMASDown(posY, posX, gridHeight, gridWidth, grid) ? 1 : 0;
            }
        }
    }

    return count;
}

function searchMASForward(posY, posX, gridHeight, gridWidth, grid) {
    if (posY < gridHeight - 2 && posX < gridWidth - 2) {
        return grid[posY + 2][posX] === 'M' && grid[posY + 1][posX + 1] === 'A' && grid[posY][posX + 2] === 'S' && grid[posY + 2][posX + 2] === 'S';
    }

    return false;
}

function searchMASBackward(posY, posX, gridHeight, grid) {
    if (posY < gridHeight - 2 && posX > 1) {
        return grid[posY + 2][posX] === 'M' && grid[posY + 1][posX - 1] === 'A' && grid[posY][posX - 2] === 'S' && grid[posY + 2][posX - 2] === 'S';
    }

    return false;
}

function searchMASUp(posY, posX, gridWidth, grid) {
    if (posY > 1 && posX < gridWidth - 2) {
        return grid[posY][posX + 2] === 'M' && grid[posY - 1][posX + 1] === 'A' && grid[posY - 2][posX] === 'S' && grid[posY - 2][posX + 2] === 'S';
    }

    return false;
}

function searchMASDown(posY, posX, gridHeight, gridWidth, grid) {
    if (posY < gridHeight - 2 && posX < gridWidth - 2) {
        return grid[posY][posX + 2] === 'M' && grid[posY + 1][posX + 1] === 'A' && grid[posY + 2][posX] === 'S' && grid[posY + 2][posX + 2] === 'S';
    }

    return false;
}

const grid = getGrid(FILE);

console.log('Part1:');
let countXMAS = searchXMAS(grid);
console.log(countXMAS);

console.log('Part2:');
let countMAS = searchMAS(grid);
console.log(countMAS);
