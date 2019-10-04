/**
 * @fileoverview Tests for the main entrypoint of the GitHub Action.
 * @author Nicholas C. Zakas
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------
const { expect } = require("chai");
const cp = require("child_process");
const path = require("path");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const SCRIPT_LOCATION = `node ${ path.resolve(__dirname, "../src/index.js") }`;

/**
 * Helper to test that the GitHub Action exits with an appropriate error
 * message.
 * @param {Function} run The function to run. 
 * @param {string} text The text that must appear in the error.
 */
function expectFailure(run, text) {
    try {
        run();
        throw new Error("Script did not fail.");
    } catch (ex) {
        if (ex.stdout) {
            expect(ex.stdout.toString()).to.have.string("githubToken");
        } else {
            throw ex;
        }
    }
}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("GitHub Action", () => {
    it("should fail when missing GitHub token", () => {
        expectFailure(() => {
            cp.execSync(SCRIPT_LOCATION);
        }, "githubToken");    
    });
});
