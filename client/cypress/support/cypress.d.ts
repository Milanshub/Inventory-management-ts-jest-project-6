// cypress/support/cypress.d.ts

declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Chainable<Element>; // Add your custom login command
    }
}
