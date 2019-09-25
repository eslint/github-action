# ESLint GitHub Action

This GitHub Action is designed to run ESLint on a pull request and leave comments on any issues found.

### Prerequisites

In order to use this action, your project must have ESLint configured to run within your project. That means you must have a `package.json` file that specifies the version of `eslint` to use and any shareable configs that your project relies on.

## Configuring

First, create an npm script called `eslint:github-action` in your `package.json` file. This script should run ESLint on all of the files that should be linted on a pull request. The script must include the `-f json` option, which outputs ESLint results in JSON format. This is important for the action to understand the ESLint results. Here's an example script:

```json
{
  "scripts": {
    "eslint:github-action": "eslint src/ -f json"
  }
}
```

You can also add in any additional command line arguments to ESLint in the `eslint:github-action` script so that ESLint runs exactly the way you want it to.

Next, you'll need to create GitHub Actions workflow file to use this action, and you'll need to know the latest version of this action.

To find the latest version of this action, see the [releases](https://github.com/eslint/github-action/releases) page. If the latest release is `v1`, you would use this action in your workflow file as follows:

```yaml
name: Run ESLint on Pull Requests

on:
  - pull_request

jobs:
  build:
    name: Run ESLint
    runs-on: ubuntu-latest
    steps:
      
      # Check out the repository
      - uses: actions/checkout@v1

      # Install Node.js
      - uses: actions/setup-node@v1
        with:
          node-version: 12

      # Install your dependencies
      - run: npm ci

      # Run ESLint
      - uses: eslint/github-action@v1
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
```

**Note:** The `GITHUB_TOKEN` secret is automatically created by GitHub for every project; there is no need to create your own secret unless you want to use a token that is different from the default.

## Branches

* `master` - ongoing development. You should not use this branch in your GitHub workflows because it will not work.
* `draft` - a draft of the next release. This may be unstable and also should not be used in your GitHub workflows.
* `releases/v*` - branches for official releases, where the `*` is replaced with a version number.

## License

Apache 2.0
