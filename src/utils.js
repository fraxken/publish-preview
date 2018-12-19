/**
 * @namespace Utils
 */

// Require Third-party Dependencies
const { green } = require("kleur");

// CONSTANT
const KEY_LEN = 16;

/**
 * @func logProperty
 * @desc Log a property in the console
 * @memberof Utils#
 * @param {!String} name property name
 * @param {any} value property value
 * @returns {void}
 */
function logProperty(name, value) {
    const flySpace = KEY_LEN - name.length;
    console.log(`${name}${" ".repeat(flySpace)}-> ${green(value)}`);
}

/**
 * @func unitSize
 * @desc Get unit size in B or kB
 * @memberof Utils#
 * @param {!Number} unit unit
 * @return {String}
 */
function unitSize(unit) {
    return unit < 1000 ? "B" : "kB";
}

module.exports = { logProperty, unitSize };
