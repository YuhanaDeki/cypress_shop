const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        logError(message) {
          console.error('Soft Assertion Error:', message);
          return null;
        },
      });
    },
    baseUrl: 'https://shop.oatzany.in.th/',
    viewportWidth: 1920,
    viewportHeight: 1080,

    env: {
      username: 'admin',
      password: '1234',
      category_name: 'Tester_Category',
      category_name_edit: 'Tester_Category_Edit',
      role_name: 'Test_Role_Name',
      role_name_edit: 'Test_Role_Edit',
      bank_init_name: 'Test_Bank_Init_Name',
      bank_full_name: 'Test_Bank_Full_Name',
      bank_init_name_edit: 'Test_Bank_Init_Name_Edit',
      bank_full_name_edit: 'Test_Bank_Full_Name_Edit',
    },

    specPattern: [
      'cypress/e2e/admin/01_setting.cy.js',
      'cypress/e2e/admin/02_user.cy.js',
      'cypress/e2e/admin/03_product.cy.js',
      'cypress/e2e/user/04_register.cy.js',
      'cypress/e2e/user/05_shop_product_user_not_payment.cy.js',
      'cypress/e2e/user/06_shop_product_user_payment.cy.js',
      'cypress/e2e/officer/07_product.cy.js',
    ],
  },



});
