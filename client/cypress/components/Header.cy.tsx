// cypress/component/Header.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../../src/components/Header';
import { MockAuthProvider } from '../../src/mocks/mockContext';

describe('Header Component', () => {
    const mountWithProviders = () => {
        // Mock navigate function
        const navigate = cy.spy().as('navigateSpy');

        // Mock AuthContext with navigate spy
        mount(
            <MemoryRouter initialEntries={['/dashboard']}>
                <MockAuthProvider>
                    <Header />
                </MockAuthProvider>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        return navigate;
    };

    it('should display the app title', () => {
        mountWithProviders();
        cy.contains('Inventory Management').should('be.visible');
    });

    it('should show dashboard and products links', () => {
        mountWithProviders();
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Products').should('be.visible');
    });

    it('should call logout and navigate to login page on logout click', () => {
        mountWithProviders();

        // Click the logout button
        cy.get('button[aria-label="Logout"]').click();

        // Verify that the user is redirected to the login page
        cy.contains('Login Page').should('be.visible');
    });
});
