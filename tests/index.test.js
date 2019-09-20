const cp = require('child_process');
const path = require('path');


// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    const ip = path.resolve(__dirname, '../src/index.js');
    
    try {
        const output = cp.execSync(`node ${ip}`, {
            env: {
                ...process.env,
                INPUT_GITHUBTOKEN: "abcxyz"
            }
        });
        console.log(output.toString());
    } catch (ex) {
        console.log(ex.stdout.toString());
        console.log(ex.stderr.toString());
        throw ex;
    }
})
