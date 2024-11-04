// cypress/component/RegisterForm.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import RegisterForm from '../../src/components/RegisterForm';
import { AuthContext } from '../../src/context/AuthContext';

describe('RegisterForm Component', () => {
    const mockRegister = cy.stub().as('registerStub');

    const mountWithContext = () => {
        mount(
            <AuthContext.Provider value={{ register: mockRegister }}>
                <RegisterForm />
            </AuthContext.Provider>
        );
    };

    beforeEach(() => {
        mockRegister.reset(); // Reset stub before each test
    });

    it('renders the form and all fields', () => {
        mountWithContext();

        cy.contains('Register').should('be.visible');
        cy.get('input[name="name"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('button[type="submit"]').contains('Register').should('be.visible');
    });

    it('updates input values when typing', () => {
        mountWithContext();

        cy.get('input[name="name"]').type('John Doe').should('have.value', 'John Doe');
        cy.get('input[name="email"]').type('johndoe@example.com').should('have.value', 'johndoe@example.com');
        cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
    });

    it('submits the form successfully and clears input fields', () => {
        mockRegister.resolves(); // Simulate successful registration

        mountWithContext();

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('johndoe@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.get('@registerStub').should('have.been.calledWith', {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        });

        // Ensure fields are cleared
        cy.get('input[name="name"]').should('have.value', '');
        cy.get('input[name="email"]').should('have.value', '');
        cy.get('input[name="password"]').should('have.value', '');
    });

    it('displays error message on registration failure', () => {
        mockRegister.rejects(new Error('Registration failed')); // Simulate registration failure

        mountWithContext();

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('johndoe@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.contains('Registration failed, please try again').should('be.visible');
    });
});
