/**
 * @fileoverview Tests for the main entrypoint of the GitHub Action.
 * @author Nicholas C. Zakas
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const cp = require("child_process");
const path = require("path");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const SCRIPT_LOCATION = `node ${ path.resolve(__dirname, "../src/index.js") }`;


function expectFailure(run, text) {
    try {
        run();
        throw new Error("Script did not fail.");
    } catch (ex) {
        if (ex.stdout) {
            expect(ex.stdout.toString()).toContain("githubToken");
        } else {
            throw ex;
        }
    }
}

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------


test("should fail when missing GitHub token", () => {
    expectFailure(() => {
        cp.execSync(SCRIPT_LOCATION);
    }, "githubToken");    
});

// shows how the runner will run a javascript action with env / stdout protocol
// xtest("test runs", () => {
//     const ip = path.resolve(__dirname, "../src/index.js");

//     try {
//         const output = cp.execSync(`node ${ip}`, {
//             env: {
//                 ...process.env,
//                 INPUT_GITHUBTOKEN: "abcxyz"
//             }
//         });

//         console.log(output.toString());
//     } catch (ex) {
//         console.log(ex.stdout.toString());
//         console.log(ex.stderr.toString());
//         throw ex;
//     }
// });
