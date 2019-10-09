/**
 * @fileoverview Script to update the latest git tag
 * @author Nicholas C. Zakas
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

// get package version from package.json
const pkgFilename = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgFilename));
const majorVersion = pkg.version.split(".")[0];
const tagName = `v${majorVersion}`;

// delete any existing tag
execSync(`git push origin :refs/tags/${tagName}`);

// update the tag
execSync(`git tag ${tagName}`);
execSync("git push origin master --tags");
