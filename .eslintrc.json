{
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "eslint"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-console": "off",
        "camelcase": ["error", {"properties": "never"}]
    },
    "overrides": [
        {
            "files": "tests/*.js",
            "env": {
                "mocha": true
            },
            "rules": {
                "node/no-unpublished-require": "off"
            }
        }
    ]
}
