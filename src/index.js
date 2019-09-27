/**
 * @fileoverview Main GitHub Action file
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const fs = require("fs");
const core = require("@actions/core");
const github = require("@actions/github");
const { exec, createAnnotations, createSummary } = require("./util");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const SCRIPT_NAME = "eslint:github-action";

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

// most @actions toolkit packages have async methods
async function run() {
    try {

        const token = core.getInput("githubToken", { required: true });
        const octokit = new github.GitHub(token);
        const context = github.context;
        let annotations = [];
        let conclusion = "failure";
        let summary;

        // Only works on pull requests
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

        // Read the command from package.json (necessary to avoid extra output)
        const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
        if (!pkg.scripts || !pkg.scripts[SCRIPT_NAME]) {
            core.setFailed(`Missing ${ SCRIPT_NAME } script in package.json.`);
            return;
        }
        const command = pkg.scripts[SCRIPT_NAME];

        // run ESLint
        const { exitCode, output } = await exec(`npx ${ command }`);

        if (exitCode > 0) {
            const lintResults = JSON.parse(output);
            annotations = createAnnotations(lintResults, process.env.GITHUB_WORKSPACE)
            summary = createSummary(lintResults);

            core.startGroup("Results");
            console.log("ESLint Output");
            console.log(JSON.stringify(lintResults, null, 4));
            console.log("Annotations");
            console.log(JSON.stringify(annotations, null, 4));
            console.log("Summary:", summary);
            console.log("Conclusion:", conclusion);
            core.endGroup();
            
        } else {
            conclusion = "success";
            summary = "No problems";
        }

        // Update the check with final status
        await octokit.checks.update({
            ...context.repo,
            check_run_id: checkId,
            conclusion,
            output: {
                title: "ESLint Check",
                summary,
                annotations
            }
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
