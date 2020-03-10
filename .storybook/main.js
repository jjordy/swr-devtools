const path = require('path');

module.exports = {
  stories: ["./**/*.stories.[tj]sx"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader")
        },
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          // options: {
          //   tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
          // }
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};