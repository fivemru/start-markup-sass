module.exports = {
    root: true,
    plugins: [
        'prettier',
        // 'node',
    ],
    extends: [
        'eslint:recommended',
        // 'plugin:node/recommended',
        'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            // experimentalObjectRestSpread: true,
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
    },
}
