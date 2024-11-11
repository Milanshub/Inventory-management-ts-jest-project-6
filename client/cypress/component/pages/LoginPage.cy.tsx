// cypress/component/LoginPage.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import LoginPage from '../../../src/pages/LoginPage';   
import { MockAuthProvider } from '../../../src/mocks/mockContext';
import { MemoryRouter } from 'react-router-dom';

describe('LoginPage Component', () => {
    const mountWithProviders = () => {
        mount(
            <MemoryRouter>
                <MockAuthProvider>
                    <LoginPage />
                </MockAuthProvider>
            </MemoryRouter>
        );
    };

    it('renders LoginForm within LoginPage', () => {
        mountWithProviders();

        // Verify the "Login" heading from LoginForm is visible
        cy.contains('Login').should('be.visible');

        // Check that LoginForm fields and button are present
        cy.get('input[type="email"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button').contains('Login').should('exist');
    });
});
