module.exports = {
  presets: ['react-app'],
  sourceType: 'unambiguous',
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
};
