// cypress.config.js

const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: require(path.resolve(__dirname, 'webpack.config.js')), // Ensure your Webpack config is referenced here
    },
  },
  video: false, // Optional: Disable video recording for headless runs
});
