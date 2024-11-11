// cypress/component/NotFoundPage.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import NotFoundPage from '../../../src/pages/NotFoundPage';

describe('NotFoundPage Component', () => {
    it('displays the 404 error message and description', () => {
        mount(<NotFoundPage />);

        // Verify that the main heading is displayed
        cy.contains('h1', '404 - Page Not Found').should('be.visible');

        // Verify that the description text is displayed
        cy.contains('Sorry, the page you are looking for does not exist.').should('be.visible');
    });
});
