// cypress/component/PieChart.cy.tsx
import React from 'react';
import { mount } from '@cypress/react';
import PieChart from '../../src/components/PieChart';
import { ProductContext } from '../../src/context/ProductContext';
import { IProduct } from '../../src/models/productModel';

describe('PieChart Component', () => {
    const mountWithProviders = (products: IProduct[]) => {
        mount(
            <ProductContext.Provider value={{ 
                products, 
                addProduct: async () => {}, 
                updateProduct: async () => {}, 
                deleteProduct: async () => {}, 
                lastUpdated: new Date()
            }}>
                <PieChart />
            </ProductContext.Provider>
        );
    };


    it('displays "No chart data available" if there are no products', () => {
        mountWithProviders([]);
        cy.contains('No chart data available').should('be.visible');
    });

    it('renders the chart with product data', () => {
        const mockProducts: IProduct[] = [
            { _id: '1', name: 'Product 1', quantity: 10, price: 100, lastUpdated: new Date() },
            { _id: '2', name: 'Product 2', quantity: 5, price: 50, lastUpdated: new Date() },
            { _id: '3', name: 'Product 3', quantity: 15, price: 150, lastUpdated: new Date() },
        ];

        mountWithProviders(mockProducts);
        
        cy.get('canvas').should('exist'); // Ensure the chart canvas is rendered
    });
});
