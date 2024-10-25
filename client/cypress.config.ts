// cypress.config.js

const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  projectId: "3eej9n",

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: require(path.resolve(__dirname, "webpack.config.js")), // Ensure your Webpack config is referenced here
    },
  },

  // Optional: Disable video recording for headless runs
  // e2e: {
  //   setupNodeEvents(on, config) {
  //     // implement node event listeners here
  //   },
  // },
  video: false,

  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Adjust this to your app's URL
  },
});
