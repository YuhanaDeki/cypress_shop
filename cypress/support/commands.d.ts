/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in the user
     * @example cy.login()
     */
    login(): Chainable<void>;
  }
}
