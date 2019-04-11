module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
    ],
    "rules": {
        "eqeqeq": "error",
        "curly": "error",
        "quotes": ["error", "single"]
    }
};