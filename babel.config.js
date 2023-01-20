// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      'transform-inline-environment-variables',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            contexts: './contexts',
            components: './components',
            context: './context',
            utils: './utils',
            services: './services',
            hooks: './hooks',
          },
        },
      ],
    ],
  };
};
