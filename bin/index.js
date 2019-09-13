#!/usr/bin/env node
"use strict";

require("make-promises-safe");

// Require Node.js Dependencies
const { execSync } = require("child_process");
const { parse } = require("path");
const { promisify } = require("util");
const fs = require("fs");

// Require Third-party Dependencies
const { green, yellow, gray, cyan, white } = require("kleur");
const prettysize = require("prettysize");
const Mode = require("stat-mode");
const asTable = require("as-table");

// Require Internal Dependencies
const { logProperty } = require("../src/utils");

// HEAD Variables...
const stat = promisify(fs.stat);
const doNotLog = new Set(["files", "bundled", "entryCount"]);

// Execute command in synchronous
console.log(`\n${gray(" > npm pack --dry-run --json --loglevel=silent")}`);
const stdout = execSync("npm pack --dry-run --json --loglevel=silent");

/** @type {PublishPreview.TarballPackage[]} */
const [result] = JSON.parse(stdout.toString());

// Update result properties
result.name = `${result.name} (${cyan(result.filename)})`;
result.size = `${yellow(prettysize(result.size, { places: 2 }))}`;
result.unpackedSize = `${yellow(prettysize(result.unpackedSize, { places: 2 }))}`;
delete result.filename;

console.log(`\n${yellow("Publication (Package) Preview")}\n`);
for (const [name, value] of Object.entries(result)) {
    if (doNotLog.has(name)) {
        continue;
    }
    logProperty(name, value);
}
const bundled = result.bundled.map((dep) => cyan(dep)).join(", ");
logProperty("bundled", white(`[${bundled}]`));

/**
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    // Retrieve all files stat in Asynchronous
    const statFiles = await Promise.all(result.files.map((file) => stat(file.path)));

    console.log(`\n${green(result.entryCount)} ${yellow("Files")}\n`);
    const stdout = [];
    for (let id = 0; id < result.files.length; id++) {
        const { path, size } = result.files[id];
        const { dir, base } = parse(path);

        stdout.push([
            green(`📁 ${dir === "" ? "/" : dir} `),
            `<${yellow(prettysize(size, { places: 2 }))}>`,
            gray(new Mode(statFiles[id]).toString()),
            base
        ]);
    }
    console.log(`${asTable(stdout)}\n`);
}
main().catch(console.error);
