const { addMochawesomeReporter } = require('cypress-mochawesome-reporter/plugin');

module.exports = (on, config) => {
  // Agregar el plugin mochawesome reporter
  addMochawesomeReporter(on);

  // Devolver la configuración
  return config;
};