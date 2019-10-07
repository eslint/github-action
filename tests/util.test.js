/**
 * @fileoverview Tests for the utilities.
 * @author Nicholas C. Zakas
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { createAnnotations } = require("../src/util");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const ESLINT_RESULTS = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "fixtures/eslint-results.json"),
    "utf8"
));
const GITHUB_ANNOTATIONS = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "fixtures/github-annotations.json"),
    "utf8"
));
const WORKSPACE_DIR = "/home/runner/work/github-action/github-action";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("util", () => {
    describe("createAnnotations()", () => {
        it("should produce expected output when passed ESLint results", () => {
            const result = createAnnotations(ESLINT_RESULTS, WORKSPACE_DIR);

            expect(result).to.deep.equal(GITHUB_ANNOTATIONS);
        });

    });
});
