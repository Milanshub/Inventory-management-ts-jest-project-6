// cypress/component/Footer.spec.tsx
import React from 'react';
import { mount } from 'cypress/react18'
import Footer from '../../../src/components/Footer'; // Adjust the path as necessary

describe('Footer Component', () => {
  it('renders the footer with the current year and links', () => {
    mount(<Footer />); // Mount the Footer component

    // Assert that the copyright text is rendered with the current year
    const currentYear = new Date().getFullYear();
    cy.contains(`© ${currentYear} Inventory Management. All rights reserved.`).should('be.visible');

    // Check if the Privacy Policy link is rendered and has the correct href
    cy.get('a[href="/privacy"]').should('be.visible');
    cy.get('a[href="/privacy"]').contains('Privacy Policy');

    // Check if the Terms of Service link is rendered and has the correct href
    cy.get('a[href="/terms"]').should('be.visible');
    cy.get('a[href="/terms"]').contains('Terms of Service');
  });
});
