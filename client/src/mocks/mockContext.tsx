// src/mocks/mockContext.tsx

import React, { ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as necessary
import { ProductContext } from '../context/ProductContext'; // Adjust the path as necessary
import { IUser, IUserInput } from '../models/userModel'; // Adjust the path as necessary
import { IProduct, IProductInput } from '../models/productModel'; // Adjust the path as necessary

// Define the shape of the mocked AuthContext
const mockAuthContextValue = {
    user: { id: 'user1', name: 'John Doe' } as IUser, // Mock user data
    login: async (email: string, password: string) => {
        console.log('Mock login for:', email); // Mock login
    },
    logout: () => {
        console.log('Mock logout'); // Mock logout
    },
    register: async (userData: IUserInput) => {
        console.log('Mock registration for:', userData); // Mock registration
    },
};

// Define the shape of the mocked ProductContext
const mockProductContextValue = {
    products: [
        { _id: '1', name: 'Product 1', lastUpdated: new Date(2023, 9, 22, 10, 30) }, // Mock product data
        { _id: '2', name: 'Product 2', lastUpdated: new Date(2023, 9, 23, 12, 0) },
    ] as IProduct[], // Ensure products match the expected type
    addProduct: async (productData: IProductInput) => {
        console.log('Mock add product:', productData); // Mock add product
    },
    updateProduct: async (id: string, productData: Partial<IProduct>) => {
        console.log('Mock update product:', id, productData); // Mock update product
    },
    deleteProduct: async (id: string) => {
        console.log('Mock delete product:', id); // Mock delete product
    },
    lastUpdated: null as Date | null, // Allow for null last updated date
};

// Define the props for MockProductProvider
interface MockProductProviderProps {
    children: ReactNode;
    value?: typeof mockProductContextValue; // Optional value prop
}

// Mock Provider Components
export const MockAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
    <AuthContext.Provider value={mockAuthContextValue}>
        {children}
    </AuthContext.Provider>
);

export const MockProductProvider: React.FC<MockProductProviderProps> = ({ children, value = mockProductContextValue }) => (
    <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
);