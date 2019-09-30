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
        silent: true,
        ignoreReturnCode: true,
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
<<<<<<< Updated upstream
    }).catch(error => {
        return {
            exitCode: 1,
            output
        };
=======
>>>>>>> Stashed changes
    });
};

/**
 * Creates annotations based on the lint results.
 * @param {Array} lineResults An array of lint results from an ESLint run.
 * @param {string} baseDir The base directory to strip off of the file paths
 *      for each result.
 * @returns {Array} An array of GitHub annotations.
 */
exports.createAnnotations = function(lintResults, baseDir) {
    
    const annotations = [];

    for (const result of lintResults) {
        for (const message of result.messages) {
            annotations.push({
                path: result.filePath.slice(baseDir.length + 1),
                start_line: message.line,
                end_line: "endLine" in message ? message.endLine : message.line,
                message: message.message,
                annotation_level: message.severity === 2 ? "failure" : "warning",
                title: message.ruleId
            });
        }
    }

    return annotations;
};

/**
 * Creates a summary of the ESLint run.
 * @param {Array} lineResults An array of lint results from an ESLint run.
 * @returns {string} A description of the ESLint run results.
 */
exports.createSummary = function(lintResults) {
    
    let errors = 0;
    let warnings = 0;

    for (const result of lintResults) {
        for (const message of result.messages) {
            if (message.severity === 2) {
                errors++;
            } else {
                warnings++;
            }
        }
    }

    return `${ errors + warnings} problems (${ errors } errors, ${ warnings } warnings)`;
};
