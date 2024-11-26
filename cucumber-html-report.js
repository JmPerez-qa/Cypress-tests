const report = require("multiple-cucumber-html-reporter");
report.generate({
  jsonDir: "reports/cucumber-htmlreport.html/jsonlogs", // ** Path of .json file **//
  reportPath: "reports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "104.0.5112.102",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
});
