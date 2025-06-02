const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // 1) Definimos la URL base: 
    //    cuando hagas cy.visit('/'), realmente visitará https://demoblaze.com/
    baseUrl: 'https://demoblaze.com/',

    // 2) Tamaño por defecto (Desktop):
    viewportWidth: 1280,
    viewportHeight: 720,

    // 3) Desactivar grabación de videos:
    video: false, 

    // 4) Timeout por defecto para comandos:
    defaultCommandTimeout: 8000,

    // 5) Patrón para encontrar todos los specs (*.cy.js):
    specPattern: 'cypress/e2e/**/*.cy.js',

    // 6) Reporter: Mochawesome
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome-report', // carpeta de salidas JSON/HTML
      overwrite: false,  // no sobreescribir JSON anteriores
      html: false,       // inicialmente solo generamos JSON
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },

    // 7) Archivo de soporte global:
    supportFile: 'cypress/support/e2e.js',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
