// cypress/component/HomePage.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import HomePage from '../../../src/pages/HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage Component', () => {
    const mountWithRouter = () => {
        mount(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    };

    it('renders the welcome message and buttons', () => {
        mountWithRouter();

        // Check for welcome message
        cy.contains('Welcome to Inventory Management').should('be.visible');

        // Check for Login button
        cy.contains('a', 'Login').should('be.visible');

        // Check for Register button
        cy.contains('a', 'Register').should('be.visible');
    });

    it('Login button links to the login page', () => {
        mountWithRouter();

        // Check that Login button links to "/login"
        cy.contains('a', 'Login').should('have.attr', 'href', '/login');
    });

    it('Register button links to the register page', () => {
        mountWithRouter();

        // Check that Register button links to "/register"
        cy.contains('a', 'Register').should('have.attr', 'href', '/register');
    });
});
