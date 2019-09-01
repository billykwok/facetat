// @flow
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-flow'],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }]
  ]
};
