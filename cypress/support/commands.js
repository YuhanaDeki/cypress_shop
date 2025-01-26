// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';
import 'cypress-xpath';

let errors = [];

Cypress.Commands.add('softAssert', (callback) => {
    try {
        callback();
    } catch (error) {
        errors.push(error.message);
        Cypress.log({
            name: 'Soft Assertion',
            message: error.message,
            consoleProps: () => ({ error }),
        });
    }
});

Cypress.Commands.add('softAssertAll', () => {
    if (errors.length > 0) {
        throw new Error(`Soft Assertion Failures:\n${errors.join('\n')}`);
    }
});

// Login
Cypress.Commands.add('login', (username, password, maxRetries = 5) => {
    cy.log('Starting login process');
    cy.wait(1000);
    cy.xpath('//*[@href="/login"]').click();
    cy.url().should('include', '/login')
    cy.xpath('//*[@id="username"]', { timeout: 5000 }).type(username);
    cy.xpath('//*[@id="password"]', { timeout: 5000 }).type(password);
    cy.xpath('//*[@name="login"]', { timeout: 5000 }).click();
    waitForLoginSuccess(2);
});


function waitForLoginSuccess(time) {
    if (time <= 0) {
        throw new Error('Login Success find element not found');
    }

    cy.xpath('//*[@class="swal2-title"]', { timeout: 5000 }).then(($result) => {
        const alertText = $result.text().trim();
        if (alertText === 'Login Success') {
            // Login สำเร็จ
            cy.log('Login Success element found');
            cy.xpath('//*[@class="swal2-confirm swal2-styled"]', { timeout: 5000 }).click();
        } else {
            // Login ไม่สำเร็จ ให้ลองใหม่
            cy.log(`Login failed. Retrying... (${retriesLeft - 1} retries left)`);
            cy.wait(1000).then(() => {
                waitForLoginSuccess(retriesLeft - 1);
            });
        }
    });
};

