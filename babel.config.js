// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-inline-environment-variables',
      'module:react-native-dotenv',
      [
        'module-resolver',
        {
          alias: {
            contexts: './contexts',
            components: './components',
            context: './context',
            utils: './utils',
            services: './services',
          },
        },
      ],
    ],
  };
};
