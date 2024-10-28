import React from 'react';
import { mount } from 'cypress/react18';
import ProductForm from '../../src/components/ProductForm'; // Adjust the path as necessary
import { MockProductProvider } from '../../src/mocks/mockContext'; // Use your mock context
import sinon from 'sinon'; // Import Sinon
import { IProductInput } from '../../src/models/productModel'; // Adjust the path as necessary

describe('ProductForm Component', () => {
  let mockAddProduct: sinon.SinonStub<[IProductInput], Promise<void>>; // Ensure correct typing

  beforeEach(() => {
    // Create new stub for each test
    mockAddProduct = sinon.stub().resolves() as sinon.SinonStub<[IProductInput], Promise<void>>; 

    const mockProductContext = {
      products: [], // Initial products, if necessary
      addProduct: mockAddProduct,
      updateProduct: sinon.stub().resolves(), // Add stubs for other methods if necessary
      deleteProduct: sinon.stub().resolves(), // Add stubs for other methods if necessary
      lastUpdated: null,
    }; 

    // Mount the ProductForm component with the ProductContext provider
    mount(
      <MockProductProvider value={mockProductContext}>
        <ProductForm />
      </MockProductProvider>
    );
  });

  it('renders the form correctly', () => {
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="quantity"]').should('be.visible');
    cy.get('input[name="price"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Save Product');
  });

  it('submits the form with correct values', () => {
    cy.get('input[name="name"]').type('Test Product');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="price"]').type('20');

    cy.get('button[type="submit"]').click();

    // Assert that addProduct was called with correct arguments
    cy.wrap(mockAddProduct).should('be.calledWith', {
      name: 'Test Product',
      quantity: 10,
      price: 20,
    });
  });

  it('clears the input fields after submission', () => {
    cy.get('input[name="name"]').type('Test Product');
    cy.get('input[name="quantity"]').type('10');
    cy.get('input[name="price"]').type('20');

    cy.get('button[type="submit"]').click();

    // After submission, check that the inputs are cleared
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="quantity"]').should('have.value', '0'); // As per initial state
    cy.get('input[name="price"]').should('have.value', '0'); // As per initial state
  });
});
