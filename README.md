# publish-preview
![V0.2.1](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/fraxken/publish-preview/master/package.json&query=$.version&label=Version)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![size](https://img.shields.io/bundlephobia/min/publish-preview)
[![Known Vulnerabilities](https://snyk.io/test/github/fraxken/publish-preview/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fraxken/publish-preview?targetFile=package.json)
[![Build Status](https://travis-ci.com/fraxken/publish-preview.svg?branch=master)](https://travis-ci.com/fraxken/publish-preview)

Node.js CLI to get a preview of properties and files that will be published on the NPM registry.
Under the hood, the package run the following command:

> npm pack --dry-run --json --loglevel=silent`

<p align="center">
    <img src="https://i.imgur.com/kCqawKg.png" height="450">
</p>

## Getting Started
This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm install publish-preview -g
# or
$ npx publish-preview
```

## Usage example
When installed globally the `pubview` executable will be exposed in your terminal

```bash
$ cd yourProject
$ pubview
```

## License
MIT
