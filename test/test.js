"use strict";

// Require Third-party Dependencies
const avaTest = require("ava");

// Require Internal Dependencies
const { logProperty } = require("../src/utils");

avaTest("logProperty should return undefined", async(assert) => {
  const ret = logProperty("key", "value");
  assert.true(typeof ret === "undefined");
});
