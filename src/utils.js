"use strict";

/**
 * @namespace Utils
 */

// Require Third-party Dependencies
const { green } = require("kleur");

// CONSTANT
const KEY_LEN = 16;

/**
 * @function logProperty
 * @description Log a property in the console
 * @memberof Utils#
 * @param {!string} name property name
 * @param {any} [value] property value
 * @returns {void}
 */
function logProperty(name, value) {
    const flySpace = KEY_LEN - name.length;
    console.log(`${name}${" ".repeat(flySpace)}-> ${green(value)}`);
}

module.exports = {
    logProperty,
    CONSTANTS: Object.freeze({ KEY_LEN })
};
