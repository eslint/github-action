/**
 * @fileoverview Main GitHub Action file
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("./exec");

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

// most @actions toolkit packages have async methods
async function run() {
    try {

        const token = core.getInput("githubToken", { required: true });
        const octokit = new github.GitHub(token);
        const context = github.context;

        if (context.eventName !== "pull_request") {
            core.setFailed("ESLint GitHub Action can only be performed on the pull_request event.");
            return;
        }

        // Create the initial check
        const { data: { id: checkId } } = await octokit.checks.create({
            ...context.repo,
            name: "@eslint/github-action",
            head_sha: context.sha,
            status: "in_progress"
        });

        // run ESLint
        const lintResult = JSON.parse(await exec("npm run eslint:github-action"));
        core.startGroup("ESLint JSON Results");
        core.debug(JSON.stringify(lintResult, null, 4));
        core.endGroup();
        
        // Update the check with final status
        await octokit.checks.update({
            ...context.repo,
            check_run_id: checkId,
            status: "completed",
            conclusion: "success",
            output: {
                title: "ESLint Check",
                summary: "No problems found."
            }
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
