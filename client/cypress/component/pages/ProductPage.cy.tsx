// cypress/component/ProductPage.cy.tsx
import React from 'react';
import { mount } from 'cypress/react18';
import ProductPage from '../../../src/pages/ProductPage';
import { MockProductProvider } from '../../../src/mocks/mockContext';
import { IProduct, IProductInput } from '../../../src/models/productModel';
import sinon from 'sinon';

describe('ProductPage Component', () => {
    let mockAddProduct: sinon.SinonStub<[IProductInput], Promise<void>>;
    let mockUpdateProduct: sinon.SinonStub<[string, Partial<IProduct>], Promise<void>>;
    let mockDeleteProduct: sinon.SinonStub<[string], Promise<void>>;

    beforeEach(() => {
        // Stubs for product context functions
        mockAddProduct = sinon.stub() as sinon.SinonStub<[IProductInput], Promise<void>>;
        mockUpdateProduct = sinon.stub() as sinon.SinonStub<[string, Partial<IProduct>], Promise<void>>;
        mockDeleteProduct = sinon.stub() as sinon.SinonStub<[string], Promise<void>>;

        const mockProductContext = {
            products: [
                { _id: '1', name: 'Product 1', quantity: 10, price: 100, lastUpdated: new Date() },
                { _id: '2', name: 'Product 2', quantity: 5, price: 50, lastUpdated: new Date() }
            ] as IProduct[], // Mock product data with defined prices
            addProduct: mockAddProduct,
            updateProduct: mockUpdateProduct,
            deleteProduct: mockDeleteProduct,
            lastUpdated: new Date(),
        };

        // Mount ProductPage with mocked provider
        mount(
            <MockProductProvider value={mockProductContext}>
                <ProductPage />
            </MockProductProvider>
        );
    });

    it('renders ProductForm and ProductList components', () => {
        // Verify that ProductForm is rendered by checking for the Save Product button
        cy.contains('Save Product').should('be.visible');

        // Verify that ProductList is rendered by checking for Product List title
        cy.contains('Product List').should('be.visible');

        // Verify that ProductList displays mock products correctly
        cy.contains('Product 1').should('be.visible');
        cy.contains('Product 2').should('be.visible');
        cy.contains('10').should('be.visible');
        cy.contains('100.00').should('be.visible');
    });
});
