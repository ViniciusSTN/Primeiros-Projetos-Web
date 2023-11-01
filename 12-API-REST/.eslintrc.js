module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': 'off',
    'quotes': 'off',
    'quote-props': 'off',
    'camelcase': 'off',
  },
};
