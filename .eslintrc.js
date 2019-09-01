// @flow
module.exports = {
  env: {
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  plugins: ['babel', 'jest', 'flowtype', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true }
  },
  settings: {
    flowtype: { onlyFilesWithFlowAnnotation: true },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'], moduleDirectory: ['node-modules'] }
    }
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype'
  ],
  rules: {
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off'
  }
};
