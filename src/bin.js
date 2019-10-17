#!/usr/bin/env node
/**
 * @fileoverview Main GitHub Action file
 * @author Nicholas C. Zakas
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const core = require("@actions/core");

// const github = require("@actions/github");
const { exec } = require("@actions/exec");

// const { exec, createAnnotations, createSummary } = require("./util");

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const SCRIPT_NAME = "eslint:github-action";

// const TOKEN_NAME = "githubToken";
// const CHECK_NAME = "ESLint";

const MATCHER_PATH = path.resolve(__dirname, "./matcher.json");

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------

// register problem matcher
console.log(`##[add-matcher]${MATCHER_PATH}`);

(async() => {
    try {

        // const token = core.getInput(TOKEN_NAME, { required: true });
        // const octokit = new github.GitHub(token);
        // const context = github.context;

        /*
         * context.sha on pull requests isn't actually the SHA of the commits
         * on the pull request. Instead, it's the SHA of the commit in the
         * branch or fork that the pull request was sent from. Leaving
         * annotations on that SHA means they won't show up in the pull request
         * UI. So, adjust the SHA so annotations actually show up on the
         * pull request itself.
         */
        // const shaToAnnotate = context.payload.pull_request
        //     ? context.payload.pull_request.head.sha
        //     : context.sha;

        // let annotations = [];
        // const conclusion = "failure";
        // let summary;

        // Read the command from package.json (necessary to avoid extra output)
        // const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

        // if (!pkg.scripts || !pkg.scripts[SCRIPT_NAME]) {
        //     core.setFailed(`Missing ${SCRIPT_NAME} script in package.json.`);
        //     return;
        // }
        // const command = pkg.scripts[SCRIPT_NAME];

        // run ESLint
        // const { exitCode, output } = await exec(`npx ${command}`);
        await exec(`npm run ${SCRIPT_NAME}`);

        // if (exitCode > 0) {

        //     // Create the initial check
        //     const { data: { id: checkId } } = await octokit.checks.create({
        //         ...context.repo,
        //         name: CHECK_NAME,
        //         head_sha: shaToAnnotate,
        //         status: "in_progress"
        //     });

        //     const lintResults = JSON.parse(output);

        //     annotations = createAnnotations(lintResults, process.env.GITHUB_WORKSPACE);
        //     summary = createSummary(lintResults);

        //     /*
        //      * Update the final check status and add annotations. Note that
        //      * only 50 annotations can be added per update check API call,
        //      * so we need to make multiple calls if there are more than 50
        //      * annotations.
        //      */
        //     let annotationsStart = 0;

        //     do {
        //         const annotationsToPost =
        //             annotations.slice(annotationsStart, annotationsStart + 50);

        //         await octokit.checks.update({
        //             ...context.repo,
        //             check_run_id: checkId,
        //             conclusion,
        //             output: {
        //                 title: CHECK_NAME,
        //                 summary,
        //                 annotations: annotationsToPost
        //             }
        //         });

        //         annotationsStart += 50;

        //     } while (annotationsStart < annotations.length);

        //     // set original check to fail
        //     core.setFailed(summary);
        // }

    } catch (error) {
        core.setFailed(error.message);
    }
})();
