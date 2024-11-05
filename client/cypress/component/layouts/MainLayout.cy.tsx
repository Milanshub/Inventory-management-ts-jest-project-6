import React from 'react';
import { mount } from '@cypress/react';
import MainLayout from '../../../src/layouts/MainLayout';
import Dashboard from '../../../src/pages/Dashboard';
import {Header} from '../../../src/components/Header';
import Footer from '../../../src/components/Footer';
import { MockAuthProvider, MockProductProvider } from '../../../src/mocks/mockContext';
import { MemoryRouter } from 'react-router-dom';

describe('MainLayout Component Integration', () => {
    const mountMainLayoutWithDashboard = () => {
        mount(
            <MemoryRouter>
                <MockAuthProvider>
                    <MockProductProvider>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </MockProductProvider>
                </MockAuthProvider>
            </MemoryRouter>
        );
    };

    it('renders Header, Footer, and Dashboard content within MainLayout', () => {
        mountMainLayoutWithDashboard();

        // Verify the Header renders correctly
        cy.contains('Inventory Management').should('be.visible'); // Replace with text specific to your Header component

        // Verify the Dashboard content is rendered
        cy.contains('Total Inventory Value').should('be.visible'); // Replace with text specific to your Dashboard component
        cy.contains('Stock Distribution by Product').should('be.visible');

        // Verify the Footer renders correctly
        cy.contains('All rights reserved.').should('be.visible'); // Replace with text specific to your Footer component
    });
});
