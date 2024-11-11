// cypress/component/RegisterPage.cy.tsx
import React from 'react';
import { mount } from 'cypress/react18';
import RegisterPage from '../../../src/pages/RegisterPage';
import { MockAuthProvider } from '../../../src/mocks/mockContext';
import { MemoryRouter } from 'react-router-dom';

describe('RegisterPage Component', () => {
    const mountWithProviders = () => {
        mount(
            <MemoryRouter>
                <MockAuthProvider>
                    <RegisterPage />
                </MockAuthProvider>
            </MemoryRouter>
        );
    };

    it('renders RegisterForm with necessary fields and button', () => {
        mountWithProviders();

        // Check that RegisterForm renders by verifying the Register heading
        cy.contains('Register').should('be.visible');

        // Check that the necessary form fields are present
        cy.get('input[type="name"]').should('exist');
        cy.get('input[type="email"]').should('exist');
        cy.get('input[type="password"]').should('exist');

        // Check for the presence of the Register button
        cy.get('button').contains('Register').should('be.visible');
    });
});
