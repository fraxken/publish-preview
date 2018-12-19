#!/usr/bin/env node

// Require Node.js Dependencies
const { execSync } = require("child_process");
const { parse } = require("path");

// Require Third-party Dependencies
const { blue, green, yellow, white } = require("kleur");

// Require Internal Dependencies
const { logProperty, unitSize } = require("../src/utils");

// CONSTANT
DIR_SPACE = 26;

// Execute command in synchronous
const stdout = execSync("npm pack --dry-run --json --loglevel=silent");

/** @type {PublishPreview.TarballPackage[]} */
const [result] = JSON.parse(stdout.toString());

// Update size unit
result.name = `${result.name} (${blue(result.filename)})`;
result.size = `${result.size}${white(unitSize(result.size))}`;
result.unpackedSize = `${result.unpackedSize}${white(unitSize(result.unpackedSize))}`;

// Remove useless property
delete result.id;
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

console.log(`\n${yellow("┌─ Files")}`);
for (const { path, size } of result.files) {
    const { dir, base } = parse(path);

    const dirOutput = green(`[📁${dir === "" ? "." : dir}] `);
    const unit = unitSize(size);
    const sizeOutput = `<${yellow(size)} ${unit}>`;

    const dirSpace = Math.max(0, DIR_SPACE - dirOutput.length);
    const sizeSpace = Math.max(0, 10 - unit.length - size.toString().length);
    console.log(`${yellow("├─")} ${dirOutput}${" ".repeat(dirSpace)}${sizeOutput}${" ".repeat(sizeSpace)}${base}`);
}
