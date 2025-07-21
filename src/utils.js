// Import Internal Dependencies
import * as colors from "./colors.js";

// CONSTANT
export const CONSTANTS = Object.freeze({
  KEY_LEN: 16
});

/**
 * @function logProperty
 * @description Log a property in the console
 * @memberof Utils#
 * @param {!string} name property name
 * @param {any} [value] property value
 * @returns {void}
 */
export function logProperty(
  name,
  value
) {
  const flySpace = CONSTANTS.KEY_LEN - name.length;

  console.log(`${name}${" ".repeat(flySpace)}-> ${colors.green(value)}`);
}

/**
 * @param {!number} bytes
 * @returns {string}
 *
 * @example
 * formatBytes(10); // 10 B
 * formatBytes(3000); // 2.93 KB
 */
export function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }
  const id = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = parseFloat((bytes / Math.pow(1024, id)).toFixed(2));

  return `${size} ${["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][id]}`;
}
