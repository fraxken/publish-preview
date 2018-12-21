# publish-preview
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/fraxken/publish-preview/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![V1.0](https://img.shields.io/badge/version-1.2.0-blue.svg)

Node.js CLI to get a preview of properties and files that will be published on the registry by NPM.
This use the following npm command under the hood:

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

## Roadmap
- Detect if the terminal support emoji or not.

> Pull-request are welcome!
