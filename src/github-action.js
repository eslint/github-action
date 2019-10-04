/**
 * @fileoverview File that GitHub runs as the GitHub Action.
 * @author Nicholas C. Zakas
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

/*
 * Important! This file must NOT require anything other than core Node.js
 * modules. This file will be executed directly from GitHub without `npm i`
 * being run and therefore must be completely self-contained.
 */
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

// get package version from package.json
const pkgFilename = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgFilename));

// run that version from npm
cp.execSync(`npx @eslint/github-action@${ pkg.version }`);
