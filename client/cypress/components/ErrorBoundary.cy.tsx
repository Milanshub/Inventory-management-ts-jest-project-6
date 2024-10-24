// cypress/component/ErrorBoundary.spec.tsx

import React from 'react';
import { mount } from 'cypress/react'; // Import from cypress/react
import ErrorBoundary from '../../src/components/ErrorBoundary'; // Adjust the path as necessary

// Define a faulty component that throws an error
const FaultyComponent = () => {
  throw new Error('Error test'); // This will trigger the ErrorBoundary
};

describe('ErrorBoundary Component', () => {
  it('renders an error message when a component throws', () => {
    mount(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    ); // Mount the ErrorBoundary with the faulty component

    // Assert that the error message is displayed
    cy.contains(/Something went wrong/i).should('be.visible');
  });
});
