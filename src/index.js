const core = require('@actions/core');


// most @actions toolkit packages have async methods
async function run() {
  try {
    core.debug((new Date()).toTimeString())

    const token = core.getInput("githubToken", { required: true });

    // do something with token

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
