module.exports = {
  env: {
    es2021: true,
    browser: true,
    jest: true
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
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'eol-last': 'off',
    semi: 0,
    indent: 'off',
      'no-void': 'off',
    'no-useless-return': 'off',
    'no-trailing-spaces': 'off',
    'no-shadow': 'off',
    'no-debugger': 'off',
  },
};

