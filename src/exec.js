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
 * Wrapper around the exec() method from @actions/exec. Makes it easier to 
 */
module.exports = function(...args) {
    let output = "";

    const options = {
        listeners: {
            stdout(data) {
                output += data.toString();
            }
        }
    };

    return exec(...args, options).then(() => {
        return output;
    });
};
