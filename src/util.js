/**
 * @fileoverview Wrapper around @actions/exec
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const { exec } = require("@actions/exec");

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * Wrapper around the exec() method from @actions/exec. Makes it easier to run
 * commands in the GitHub Action.
 * @param {string} command The command to run.
 * @param {string[]} [args] Optional arguments to pass.
 * @returns {Object} An object with`exitCode` and `output` properties.
 */
exports.exec = function(command, ...args) {
    let output = "";

    const options = {
        listeners: {
            stdout(data) {
                output += data.toString();
            }
        }
    };

    return exec(command, args, options).then(exitCode => {
        return {
            exitCode,
            output
        };
    });
};
