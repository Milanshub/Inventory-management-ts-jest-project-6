// cypress/component/ProductList.cy.tsx

import React from 'react';
import { mount } from 'cypress/react18';
import ProductList from '../../src/components/ProductList'; // Adjust the path as necessary
import { MockProductProvider } from '../../src/mocks/mockContext'; // Adjust the path as necessary
import { IProduct } from '../../src/models/productModel'; // Adjust the path as necessary
import sinon from 'sinon'; // Import Sinon

describe('ProductList Component', () => {
    let mockAddProduct: sinon.SinonStub<[IProduct], Promise<void>>;
    let mockUpdateProduct: sinon.SinonStub<[string, Partial<IProduct>], Promise<void>>;
    let mockDeleteProduct: sinon.SinonStub<[string], Promise<void>>;

    beforeEach(() => {
        // Create stubs for the product functions
        mockAddProduct = sinon.stub().resolves();
        mockUpdateProduct = sinon.stub().resolves();
        mockDeleteProduct = sinon.stub().resolves();

        const mockProductContext = {
            products: [
                { _id: '1', name: 'Product 1', quantity: 10, price: 100, lastUpdated: new Date() },
                { _id: '2', name: 'Product 2', quantity: 5, price: 50, lastUpdated: new Date() }
            ] as IProduct[], // Mock product data
            addProduct: mockAddProduct,
            updateProduct: mockUpdateProduct,
            deleteProduct: mockDeleteProduct,
            lastUpdated: null
        };

        // Mount the ProductList component with the mocked provider
        mount(
            <MockProductProvider value={mockProductContext}>
                <ProductList />
            </MockProductProvider>
        );
    });

    it('renders the product list correctly', () => {
        cy.contains('Product List').should('be.visible');
        cy.contains('Product 1').should('be.visible');
        cy.contains('Product 2').should('be.visible');
        cy.contains('Quantity: 10').should('be.visible');
        cy.contains('Price: $100.00').should('be.visible');
    });

    it('opens the update dialog when clicking the Update button', () => {
        cy.contains('Update').first().click(); // Click the first update button
        cy.contains('Update Product').should('be.visible'); // Check if the dialog is open
    });

    it('updates a product successfully', () => {
        cy.contains('Update').first().click(); // Click the first update button
        cy.get('input[name="name"]').clear().type('Updated Product 1'); // Update the product name
        cy.get('input[name="quantity"]').clear().type('15'); // Update the quantity
        cy.get('input[name="price"]').clear().type('150'); // Update the price
        cy.get('[data-testid="update-button"]').click(); // Click the Update button in the dialog

        // Ensure the updateProduct function was called with the correct arguments
        cy.wrap(mockUpdateProduct).should('be.calledWith', '1', { name: 'Updated Product 1', quantity: 15, price: 150 });
    });

    it('deletes a product successfully', () => {
        cy.contains('Delete').first().click(); // Click the first delete button

        // Confirm the deletion in the confirmation dialog
        cy.on('window:confirm', () => true); // Automatically confirm the delete action

        // Ensure the deleteProduct function was called with the correct arguments
        cy.wrap(mockDeleteProduct).should('be.calledWith', '1'); // Assuming product with id '1' is deleted
    });
});
