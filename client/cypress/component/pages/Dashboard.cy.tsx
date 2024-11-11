import React from 'react';
import { mount } from '@cypress/react';
import Dashboard from '../../../src/pages/Dashboard';  
import { MockProductProvider } from '../../../src/mocks/mockContext';
import { MemoryRouter } from 'react-router-dom';

describe('Dashboard Component within DashboardLayout', () => {
    const mountWithProviders = () => {
        mount(
            <MemoryRouter>
                <MockProductProvider>
                    <Dashboard />
                </MockProductProvider>
            </MemoryRouter>
        );
    };

    it('renders DashboardLayout with Dashboard content', () => {
        mountWithProviders();

        // Verify layout and structure
        cy.contains('Total Inventory Value').should('be.visible');
        cy.contains('Stock Distribution by Product').should('be.visible');

        // Check for key components within Dashboard
        cy.contains('Total Inventory Value').should('be.visible');
        cy.get('h2').should('contain.text', '$'); // Checks for the total value, formatted with $
        

        // Ensure Pie Chart is rendered
        cy.get('canvas').should('exist'); // Verifies that the PieChart component is rendered within the layout
    });

    

    it('calculates and displays total inventory value', () => {
        mountWithProviders();

        // Confirm total inventory value is calculated and displayed
        cy.contains('Total Inventory Value').should('be.visible');
        cy.get('h2').invoke('text').should('match', /^\$\d+(,\d{3})*(\.\d{2})?$/); // Checks for formatted currency
    });
});
