const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const queryData = async (query, dbconfig) => {
  let conn;
  try {
    conn = await oracledb.getConnection(dbconfig);
    const result = await conn.execute(query);
    console.log("*******************************************");
    console.log(query);
    console.log(result);
    return result;
  } catch (err) {
    console.log("Error===>" + err);
    return err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.log("Error===>" + err);
      }
    }
  }
};

module.exports = defineConfig({
  env: {
    db: {
      user: "stl",
      password: "stl",
      connectString: "bengolea.claro.amx:1521/ardprod",
    },
  },
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("task", {
        sqlQuery: ({ query, db }) => {
          return queryData(query, db); //config.env.db
        },
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    responseTimeout: 60000,
    requestTimeout: 20000,
    specPattern: "cypress/e2e/step_definition/*.spect.js",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
  },
});
