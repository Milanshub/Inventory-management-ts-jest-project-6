// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// cypress/support/e2e.js

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        body: {
            email: 'newusers@example.com',
            password: 'newspassword',
        },
        failOnStatusCode: false // Will not fail the test on 4xx or 5xx responses
    }).then((response) => {
        cy.log(response.body); // Log the response body for debugging
    });
    
});

// Alternatively you can use CommonJS syntax:
// require('./commands')