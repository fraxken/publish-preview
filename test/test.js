"use strict";

// Require Node.js Dependencies
import { test } from "node:test";
import { ok } from "node:assert";

// Import Internal Dependencies
import { logProperty } from "../src/utils.js";

test("logProperty should return undefined", () => {
  const ret = logProperty("key", "value");
  ok(typeof ret === "undefined");
});
