module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommend',
        'plugin:@typescript-eslint/recommend',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslint.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ]
    }
}