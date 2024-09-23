module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'semi': 'error',
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-unused-vars': 'warn',
    'no-console': ['warn', { allow: ['error', 'info'] }],
    'no-var': 'error',
    'prefer-const': 'error',
  },
  ignorePatterns: ['node_modules/'],
  env: {
    node: true,
    browser: true,
  },
};
