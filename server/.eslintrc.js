const { off } = require('process');

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
     'linebreak-style': 'off',
    'arrow-parens': 'off',
    'eol-last': 'off',
    semi: 0,
    indent: 'off',
      'no-void': 'off',
    'no-useless-return': 'off',
    'no-trailing-spaces': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-debugger': 'off',
  },
};
