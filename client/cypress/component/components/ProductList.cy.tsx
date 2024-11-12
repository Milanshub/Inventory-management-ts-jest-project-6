// cypress/component/ProductList.cy.tsx

import React from 'react';
import { mount } from 'cypress/react18';
import ProductList from '../../../src/components/ProductList'; // Adjust the path as necessary
import { MockProductProvider } from '../../../src/mocks/mockContext'; // Adjust the path as necessary
import { IProduct, IProductInput } from '../../../src/models/productModel'; // Adjust the path as necessary
import sinon from 'sinon'; // Import Sinon

describe('ProductList Component', () => {
    let mockAddProduct: sinon.SinonStub<[IProductInput], Promise<void>>;
    let mockUpdateProduct: sinon.SinonStub<[string, Partial<IProduct>], Promise<void>>;
    let mockDeleteProduct: sinon.SinonStub<[string], Promise<void>>;

    beforeEach(() => {
        // Create stubs for the product functions
        mockAddProduct = sinon.stub() as sinon.SinonStub<[IProductInput], Promise<void>>;
        mockUpdateProduct = sinon.stub() as sinon.SinonStub<[string, Partial<IProduct>], Promise<void>>;
        mockDeleteProduct = sinon.stub() as sinon.SinonStub<[string], Promise<void>>;

        const mockProductContext = {
            products: [
                { _id: '1', name: 'Product 1', quantity: 10, price: 100, lastUpdated: new Date() },
                { _id: '2', name: 'Product 2', quantity: 5, price: 50, lastUpdated: new Date() }
            ] as IProduct[], // Mock product data
            addProduct: mockAddProduct,
            updateProduct: mockUpdateProduct,
            deleteProduct: mockDeleteProduct,
            lastUpdated: new Date(),
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
        cy.contains('10').should('be.visible');
        cy.contains('100.00').should('be.visible');
    });

    it('opens the update dialog when clicking the Update button', () => {
        cy.contains('Update').first().click(); // Click the first update button
        cy.contains('Update Product').should('be.visible'); // Check if the dialog is open
    });

    it('updates a product successfully', () => {
        // Open the update dialog
        cy.contains('Update').first().click(); // Click the first update button
        cy.contains('Update Product').should('be.visible'); // Ensure the dialog is visible
    
        // Check if the input fields are now visible before interacting with them
        cy.get('input[name="name"]').should('be.visible').clear().type('Updated Product 1'); // Update the product name
        cy.get('input[name="quantity"]').should('be.visible').clear().type('15'); // Update the quantity
        cy.get('input[name="price"]').should('be.visible').clear().type('150'); // Update the price
        
        cy.get('[data-testid="update-button"]').click(); // Click the Update button in the dialog
    
    });
    

    it('deletes a product successfully', () => {
        cy.contains('Delete').first().click(); // Click the first delete button

        // Confirm the deletion in the confirmation dialog
        cy.on('window:confirm', () => true); // Automatically confirm the delete action

        // Ensure the deleteProduct function was called with the correct arguments
        cy.wrap(mockDeleteProduct).should('be.calledWith', '1'); // Assuming product with id '1' is deleted
    });
});
