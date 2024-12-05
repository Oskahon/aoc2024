// @ts-check
'use strict';

const fs = require('fs');

const FILE = './data.txt';

const lines = getLines(FILE);
const [rules, orders] = getRulesAndOrders(lines);
const ruleMap = parseRules(rules);

// Part1
const correctOrders = getCorrectOrders(ruleMap, orders);
const correctMiddleNumbers = getMiddleNumbers(correctOrders);
const sumOfPart1 = correctMiddleNumbers.reduce((sum, n) => sum += n, 0);

console.log(sumOfPart1);

// Part2
const incorrectOrders = getIncorrectOrders(ruleMap, orders);
const fixedOrders = fixPrintOrder(ruleMap, incorrectOrders);
const fixedMiddleNumbers = getMiddleNumbers(fixedOrders);
const sumOfPart2 = fixedMiddleNumbers.reduce((sum, n) => sum += n, 0);

console.log(sumOfPart2);

/**
 * 
 * @param {String} file 
 * @returns {Array}
 */
function getLines(file) {
    return fs.readFileSync(file, 'utf-8').split('\r\n');
}

/**
 * 
 * @param {Array} lines 
 * @returns {Array}
 */
function getRulesAndOrders(lines) {
    const emptyLine = lines.indexOf('');
    let rules = lines.slice(0, emptyLine).map(line => line.split('|'));
    let orders = lines.slice(emptyLine + 1).map(line => line.split(','));

    for (let i = 0; i < rules.length; i++) {
        rules[i] = rules[i].map(Number);
    }

    for (let i = 0; i < orders.length; i++) {
        orders[i] = orders[i].map(Number);
    }

    return [rules, orders];
}

/**
 * 
 * @param {Array} rules 
 * @returns {Map}
 */
function parseRules(rules) {
    const ruleMap = new Map();

    for (const rule of rules) {
        const [key, value] = rule;

        if (!ruleMap.has(key)) {
            ruleMap.set(key, []);
        }

        ruleMap.get(key).push(value);
    }

    return ruleMap;
}

/**
 * 
 * @param {Map} ruleMap
 * @param {Array} orders 
 * @returns {Array}
 */
function getCorrectOrders(ruleMap, orders) {
    return orders.filter(order => checkOrder(order, ruleMap));
}

function getIncorrectOrders(ruleMap, orders) {
    return orders.filter(order => !checkOrder(order, ruleMap));
}

/**
 * 
 * @param {Array} order 
 * @param {Map} ruleMap 
 * @returns {Boolean}
 */
function checkOrder(order, ruleMap) {
    const previousNumbers = [];

    for (const num of order) {
        const ruleArray = ruleMap.get(num);

        if (ruleArray) {
            for (const num of previousNumbers) {
                if (ruleArray.includes(num)) {
                    return false;
                }
            }
        }

        previousNumbers.push(num);
    }

    return true;
}

/**
 * 
 * @param {Array} orders 
 * @returns {Array}
 */
function getMiddleNumbers(orders) {
    return orders.map(order => order[Math.floor(order.length / 2)]);
}

/**
 * 
 * @param {Map} ruleMap 
 * @param {Array} orders 
 * @returns {Array}
 */
function fixPrintOrder(ruleMap, orders) {
    return orders.map(order => order.sort((a, b) => orderSort(a, b, ruleMap)));
}

/**
 * 
 * @param {Number} n1 
 * @param {Number} n2 
 * @param {Map} ruleMap 
 * @returns {Number}
 */
function orderSort(n1, n2, ruleMap) {
    if (!ruleMap.has(n1)) {
        return 0;
    }

    const ruleArray = ruleMap.get(n1);
    if (ruleArray.includes(n2)) {
        return -1;
    }

    return 1;
}

