import React from 'react';
import { mount } from 'cypress/react18';
import ProtectedRoute from '../../../src/components/ProtectedRoute'; // Adjust the path as necessary
import { AuthContext } from '../../../src/context/AuthContext'; // Adjust the path as necessary
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Import MemoryRouter for routing
import sinon from 'sinon'; // Import Sinon

describe('ProtectedRoute Component', () => {
    let mockLogin: sinon.SinonStub<[], Promise<void>>;
    let mockLogout: sinon.SinonStub<[], Promise<void>>;
    let mockRegister: sinon.SinonStub<any, Promise<void>>;

    beforeEach(() => {
        mockLogin = sinon.stub() as sinon.SinonStub<[], Promise<void>>;
        mockLogout = sinon.stub() as sinon.SinonStub<[], Promise<void>>;
        mockRegister = sinon.stub() as sinon.SinonStub<[any], Promise<void>>;
    });

    it('renders children when user is authenticated', () => {
        const mockAuthContext = {
            user: { id: 'user1', name: 'John Doe', role: 'user' as 'user' | 'admin' },
            loading: false,
            login: mockLogin,
            logout: mockLogout,
            register: mockRegister
        };

        mount(
            <AuthContext.Provider value={mockAuthContext}>
                <MemoryRouter>
                    <ProtectedRoute>
                        <div>Protected Content</div>
                    </ProtectedRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert that the protected content is visible
        cy.contains('Protected Content').should('be.visible');
    });

    it('redirects to login page content when user is not authenticated', () => {
        const mockAuthContext = {
            user: null,
            loading: false,
            login: mockLogin,
            logout: mockLogout,
            register: mockRegister
        };

        mount(
            <AuthContext.Provider value={mockAuthContext}>
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route
                            path="/protected"
                            element={
                                <ProtectedRoute>
                                    <div>Protected Content</div>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<div>Login Page</div>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Assert that the login page content is displayed
        cy.contains('Login Page').should('be.visible');
    });
});
