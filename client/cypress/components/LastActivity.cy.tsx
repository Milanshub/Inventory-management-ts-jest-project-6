// cypress/components/LastActivity.cy.tsx
import React from 'react';
import { mount } from 'cypress/react18';
import LastActivity from '../../src/components/LastActivity'; // Adjust the path as necessary
import { MockProductProvider } from '../../src/mocks/mockContext'; // Adjust the path as necessary

describe('LastActivity Component', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/products', {
            statusCode: 200,
            body: [
                { _id: '1', name: 'Product 1', lastUpdated: '2023-10-22T10:30:00Z' },
                { _id: '2', name: 'Product 2', lastUpdated: '2023-10-23T12:00:00Z' },
            ],
        }).as('getProducts');
    });

    it('renders last updated date correctly when provided', () => {
        mount(
            <MockProductProvider>
                <LastActivity />
            </MockProductProvider>
        );

        cy.wait('@getProducts'); // Wait for the mocked API call
        cy.get('h1').contains('Last Updated'); // Adjust based on your actual implementation
        cy.get('span').contains('10/23/2023, 12:00 PM'); // Adjust based on expected output
    });

    it('shows "No updates yet" when lastUpdated is null', () => {
        cy.intercept('GET', '/api/products', {
            statusCode: 200,
            body: [],
        }).as('getProducts');

        mount(
            <MockProductProvider>
                <LastActivity />
            </MockProductProvider>
        );

        cy.wait('@getProducts'); // Wait for the mocked API call
        cy.get('h1').contains('No updates yet'); // Adjust based on your actual implementation
    });
});
