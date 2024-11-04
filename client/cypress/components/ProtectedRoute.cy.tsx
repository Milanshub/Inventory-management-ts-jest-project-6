import React from 'react';
import { mount } from 'cypress/react18';
import ProtectedRoute from '../../src/components/ProtectedRoute'; // Adjust the path as necessary
import { AuthContext } from '../../src/context/AuthContext'; // Adjust the path as necessary
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing
import sinon from 'sinon'; // Import Sinon

describe('ProtectedRoute Component', () => {
    let mockLogin: sinon.SinonStub<[], Promise<void>>;
    let mockLogout: sinon.SinonStub<[], Promise<void>>;
    let mockRegister: sinon.SinonStub<any, Promise<void>>;

    beforeEach(() => {
        // Create new stubs for each test
        mockLogin = sinon.stub() as sinon.SinonStub<[], Promise<void>>;
        mockLogout = sinon.stub() as sinon.SinonStub<[], Promise<void>>;
        mockRegister = sinon.stub() as sinon.SinonStub<[any], Promise<void>>;

        // Define a mock authenticated user
        const mockAuthContext = {
            user: { id: 'user1', name: 'John Doe', role: 'user' as  'user' | 'admin' }, // Adjust role as necessary
            login: mockLogin,
            logout: mockLogout,
            register: mockRegister
        };

        // Mount the ProtectedRoute component with the mocked provider and MemoryRouter
        mount(
            <AuthContext.Provider value={mockAuthContext}>
                <MemoryRouter>
                    <ProtectedRoute>
                        <div>Protected Content</div> {/* This is the protected content */}
                    </ProtectedRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
    });

    it('renders children when user is authenticated', () => {
        // Assert that the protected content is visible
        cy.contains('Protected Content').should('be.visible');
    });

    it('redirects to login when user is not authenticated', () => {
        // Update the mockAuthContext to simulate unauthenticated user
        const mockAuthContext = {
            user: null, // This represents an unauthenticated user
            login: mockLogin,
            logout: mockLogout,
            register: mockRegister
        };

        // Remount the ProtectedRoute component with unauthenticated user context
        mount(
            <AuthContext.Provider value={mockAuthContext}>
                <MemoryRouter>
                    <ProtectedRoute>
                        <div>Protected Content</div>
                    </ProtectedRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert that the user is redirected to the login page
        cy.url().should('include', '/login'); // Adjust this based on your router setup
    });
});
