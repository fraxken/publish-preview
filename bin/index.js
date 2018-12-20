#!/usr/bin/env node

// Require Node.js Dependencies
const { execSync } = require("child_process");
const { parse } = require("path");

// Require Third-party Dependencies
const { blue, green, yellow, white } = require("kleur");

// Require Internal Dependencies
const { logProperty, unitSize, fixedSpace } = require("../src/utils");

// HEAD Variables...
const dirSpaces = fixedSpace(26);
const unitSpaces = fixedSpace(10);

// Execute command in synchronous
const stdout = execSync("npm pack --dry-run --json --loglevel=silent");

/** @type {PublishPreview.TarballPackage[]} */
const [result] = JSON.parse(stdout.toString());

// Update size unit
result.name = `${result.name} (${blue(result.filename)})`;
result.size = `${result.size}${white(unitSize(result.size))}`;
result.unpackedSize = `${result.unpackedSize}${white(unitSize(result.unpackedSize))}`;

const entryCount = result.entryCount;

// Remove useless property
delete result.filename;
delete result.entryCount;
delete result.bundled;

console.log(`\n${yellow("Publication (Package) Preview")}`);
for (const [name, value] of Object.entries(result)) {
    if (name === "files") {
        continue;
    }
    logProperty(name, value);
}

console.log(`\n${yellow(`┌─ (${entryCount}) Files`)}`);
console.log(yellow("│"));
for (let id = 0; id < result.files.length; id++) {
    const { path, size } = result.files[id];
    const { dir, base } = parse(path);
    const unit = unitSize(size);

    // Outputs
    const dirOutput = green(`📁${dir === "" ? "/" : dir} `);

    // Calculate Fixed Spaces
    const dS = dirSpaces(dirOutput.length);
    const sS = unitSpaces(unit.length - size.toString().length);

    const endCarac = id === result.files.length - 1 ? "└" : "├";
    console.log(`${yellow(endCarac)} ${dirOutput + dS}<${yellow(size)} ${unit}>${sS + base}`);
}
