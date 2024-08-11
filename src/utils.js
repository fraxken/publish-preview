// Import Third-party Dependencies
import kleur from "kleur";

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

  console.log(`${name}${" ".repeat(flySpace)}-> ${kleur.green(value)}`);
}
