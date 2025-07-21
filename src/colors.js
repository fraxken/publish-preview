// Import Node.js Dependencies
import { styleText } from "node:util";

export function green(text) {
  return styleText("green", text);
}

export function yellow(text) {
  return styleText("yellow", text);
}

export function gray(text) {
  return styleText("gray", text);
}

export function cyan(text) {
  return styleText("cyan", text);
}

export function white(text) {
  return styleText("white", text);
}

export function red(text) {
  return styleText("red", text);
}

export function magenta(text) {
  return styleText("magenta", text);
}

export function blue(text) {
  return styleText("blue", text);
}
