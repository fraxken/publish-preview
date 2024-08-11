#!/usr/bin/env node

// Import Node.js Dependencies
import { execSync } from "node:child_process";
import { parse } from "node:path";
import { stat } from "node:fs/promises";

// Import Third-party Dependencies
import kleur from "kleur";
import prettysize from "prettysize";
import Mode from "stat-mode";
import asTable from "as-table";

// Import Internal Dependencies
import { logProperty } from "../src/utils.js";

// CONSTANTS
const DO_NOT_LOG = new Set(["files", "bundled", "entryCount"]);
const { green, yellow, gray, cyan, white } = kleur;

// Execute command in synchronous

/** @type {PublishPreview.TarballPackage[]} */
let result;
{
  console.log(`\n${gray(" > npm pack --dry-run --json --loglevel=silent")}`);
  const stdout = execSync("npm pack --dry-run --json --loglevel=silent");
  [result] = JSON.parse(stdout.toString());
}

// Update result properties
result.name = `${result.name} (${cyan(result.filename)})`;
result.size = `${yellow(prettysize(result.size, { places: 2 }))}`;
result.unpackedSize = `${yellow(prettysize(result.unpackedSize, { places: 2 }))}`;
delete result.filename;

console.log(`\n${yellow("Publication (Package) Preview")}\n`);
for (const [name, value] of Object.entries(result)) {
  if (DO_NOT_LOG.has(name)) {
    continue;
  }
  logProperty(name, value);
}
const bundled = result.bundled.map((dep) => cyan(dep)).join(", ");
logProperty("bundled", white(`[${bundled}]`));

// Retrieve all files stat in Asynchronous
const statFiles = await Promise.all(
  result.files.map((file) => stat(file.path))
);

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
