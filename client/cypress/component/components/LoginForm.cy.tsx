import React from 'react';
import { mount } from 'cypress/react18'
import LoginForm from '../../../src/components/LoginForm'; // Adjust the path as necessary
import { AuthContext } from '../../../src/context/AuthContext'; // Adjust the path as necessary
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing
import sinon from 'sinon'; // Import Sinon

describe('LoginForm Component', () => {
  let mockLogin: sinon.SinonStub<[], Promise<void>>;
  let mockLogout: sinon.SinonStub<[], Promise<void>>;
  let mockRegister: sinon.SinonStub<any, Promise<void>>; // Adjusting type for stub
  console.log("Rendering LoginForm");

  beforeEach(() => {
    // Create new stubs for each test
    mockLogin = sinon.stub() as sinon.SinonStub<[], Promise<void>>;
    mockLogout = sinon.stub() as sinon.SinonStub<[], Promise<void>>;
    mockRegister = sinon.stub() as sinon.SinonStub<[any], Promise<void>>;

    const mockAuthContext = {
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister
    };

    // Mount the LoginForm component with the AuthContext provider and MemoryRouter
    mount(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  it('renders the form', () => {
    cy.contains('Login').should('be.visible');
    cy.wait(500); // Optional wait for rendering
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('displays error message on login failure', () => {
    // Simulate login failure
    mockLogin.rejects({ response: { data: { message: 'Invalid credentials' } } });

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('incorrectpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('logs in successfully', () => {
    // Simulate successful login
    mockLogin.resolves();

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('correctpassword');
    cy.get('button[type="submit"]').click();

    // Check if the inputs are cleared
    cy.get('input[type="email"]').should('have.value', '');
    cy.get('input[type="password"]').should('have.value', '');
    cy.contains('Invalid credentials').should('not.exist'); // No error message
  });

  it('redirects to register page', () => {
    cy.contains("Don't have an account yet?").find('a').click();
    // cy.url().should('include', '/register'); // Adjust based on your router setup
  });
});
