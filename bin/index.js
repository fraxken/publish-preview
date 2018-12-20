#!/usr/bin/env node
require("make-promises-safe");

// Require Node.js Dependencies
const { execSync } = require("child_process");
const { parse } = require("path");
const { promisify } = require("util");
const fs = require("fs");

// Require Third-party Dependencies
const { green, yellow, gray, cyan } = require("kleur");
const Mode = require("stat-mode");

// Require Internal Dependencies
const { logProperty, unitSize, fixedSpace } = require("../src/utils");

// HEAD Variables...
const stat = promisify(fs.stat);
const unitSpaces = fixedSpace(15);

// TODO: Improve this to detect if terminal support emoji
const showDir = process.platform === "win32";

// Execute command in synchronous
console.log(`\n${gray(" > npm pack --dry-run --json --loglevel=silent")}`);
const stdout = execSync("npm pack --dry-run --json --loglevel=silent");

/** @type {PublishPreview.TarballPackage[]} */
const [result] = JSON.parse(stdout.toString());

// Update size unit
result.name = `${result.name} (${cyan(result.filename)})`;
result.size = `${yellow(unitSize(result.size))}`;
result.unpackedSize = `${yellow(unitSize(result.unpackedSize))}`;

const entryCount = result.entryCount;

// Remove useless property
delete result.filename;
delete result.entryCount;
delete result.bundled;

console.log(`\n${yellow("Publication (Package) Preview")}\n`);
for (const [name, value] of Object.entries(result)) {
    if (name === "files") {
        continue;
    }
    logProperty(name, value);
}

async function main() {
    const dirMaxLen = result.files.reduce((prev, curr) => {
        const { dir } = parse(curr.path);

        return dir.length > prev ? dir.length : prev;
    }, 0);
    const dirSpaces = fixedSpace(dirMaxLen + 15);

    // Retrieve all files stat!
    const statFiles = await Promise.all(result.files.map((file) => stat(file.path)));

    console.log(`\n${yellow(`┌─ (${green(entryCount)}) Files`)}`);
    console.log(yellow("│"));
    for (let id = 0; id < result.files.length; id++) {
        const { path, size } = result.files[id];
        const { dir, base } = parse(path);
        const unit = unitSize(size);
        const sysRight = new Mode(statFiles[id]).toString();

        // Outputs
        const dirOutput = green(`${showDir ? "📁" : ""}${dir === "" ? "/" : dir} `);

        // Calculate Fixed Spaces
        const dS = dirSpaces(dirOutput.length);
        const sS = unitSpaces(unit.length);

        const endCarac = id === result.files.length - 1 ? "└" : "├";
        console.log(`${yellow(endCarac)} ${dirOutput + dS}<${yellow(unit)}>${sS + gray(sysRight)}   ${base}`);
    }
}
main().catch(console.error);
