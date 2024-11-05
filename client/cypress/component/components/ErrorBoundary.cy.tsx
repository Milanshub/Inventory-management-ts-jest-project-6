// cypress/component/ErrorBoundary.spec.tsx
import React from 'react';
import { mount } from 'cypress/react18'
import ErrorBoundary from '../../../src/components/ErrorBoundary';

// Define a faulty component that throws an error
const FaultyComponent = () => {
  throw new Error('Error test');
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    // Suppress uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Returning false prevents Cypress from failing the test
      return false;
    });
  });

  it('renders an error message when a component throws', () => {
    mount(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    // Assert that the error message is displayed
    cy.contains(/Something went wrong/i).should('be.visible');
  });
});
