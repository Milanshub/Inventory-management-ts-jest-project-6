// cypress/component/RegisterForm.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import RegisterForm from '../../../src/components/RegisterForm';
import { MockAuthProvider } from '../../../src/mocks/mockContext';

describe('RegisterForm Component', () => {
    const mountWithMockContext = () => {
        mount(
            <MockAuthProvider>
                <RegisterForm />
            </MockAuthProvider>
        );
    };

    it('renders the form and all fields', () => {
        mountWithMockContext();

        cy.contains('Register').should('be.visible');
        cy.get('input[type="name"]').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('button[type="submit"]').contains('Register').should('be.visible');
    });

    it('updates input values when typing', () => {
        mountWithMockContext();

        cy.get('input[type="name"]').type('John Doe').should('have.value', 'John Doe');
        cy.get('input[type="email"]').type('johndoe@example.com').should('have.value', 'johndoe@example.com');
        cy.get('input[type="password"]').type('password123').should('have.value', 'password123');
    });

    it('submits the form successfully and clears input fields', () => {
        cy.stub(console, 'log').as('log'); // Capture console log for mock success
        mountWithMockContext();

        cy.get('input[type="name"]').type('John Doe');
        cy.get('input[type="email"]').type('johndoe@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.get('@log').should('be.calledWith', 'Mock registration for:', {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        });

        cy.get('input[type="name"]').should('have.value', '');
        cy.get('input[type="email"]').should('have.value', '');
        cy.get('input[type="password"]').should('have.value', '');
    });
});
