#!/usr/bin/env node
require("make-promises-safe");

// Require Node.js Dependencies
const { execSync } = require("child_process");
const { parse, dirname } = require("path");
const { promisify } = require("util");
const fs = require("fs");

// Require Third-party Dependencies
const { green, yellow, gray, cyan, white } = require("kleur");
const prettysize = require("prettysize");
const Mode = require("stat-mode");

// Require Internal Dependencies
const { logProperty, fixedSpace } = require("../src/utils");

// HEAD Variables...
const stat = promisify(fs.stat);
const unitSpaces = fixedSpace(15);
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

async function main() {
    const dirMaxLen = result.files.reduce((prev, curr) => {
        const dir = dirname(curr.path);

        return dir.length > prev ? dir.length : prev;
    }, 0);
    const dirSpaces = fixedSpace(dirMaxLen + 15);

    // Retrieve all files stat in Asynchronous
    const statFiles = await Promise.all(result.files.map((file) => stat(file.path)));

    console.log(`\n${yellow(`┌─ (${green(result.entryCount)}) Files`)}`);
    console.log(yellow("│"));
    for (let id = 0; id < result.files.length; id++) {
        const { path, size } = result.files[id];
        const { dir, base } = parse(path);
        const unit = prettysize(size, { places: 2 });
        const sysRight = new Mode(statFiles[id]).toString();

        // Outputs
        const dirOutput = green(`${"📁"}${dir === "" ? "/" : dir} `);

        // Calculate Fixed Spaces
        const dS = dirSpaces(dirOutput.length);
        const sS = unitSpaces(unit.length);

        const endCarac = id === result.files.length - 1 ? "└" : "├";
        console.log(`${yellow(endCarac)} ${dirOutput + dS}<${yellow(unit)}>${sS + gray(sysRight)}   ${base}`);
    }
    console.log("\n");
}
main().catch(console.error);
