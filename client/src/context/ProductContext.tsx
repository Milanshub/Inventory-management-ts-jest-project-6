import React, { createContext, useState, ReactNode } from 'react';
import { IProduct, IProductInput } from '../models/productModel';
import { addProduct as apiAddProduct, getProducts } from '../services/productService';
import log from '../utils/logger';

interface ProductContextType {
    products: IProduct[];
    addProduct: (productData: IProductInput) => Promise<void>; 
    fetchProducts: () => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined); 

export const ProductProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [ products, setProducts] = useState<IProduct[]>([]); 

    const fetchProducts = async () => {
        try { 
            const fetchedProducts = await getProducts(); 
            setProducts(fetchedProducts);
        } catch (error) {
            log.error('Failed to fetch products', error)
        }
    }; 

    const addProduct = async (productData: IProductInput) => {
        try {
            const newProduct = await apiAddProduct(productData);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        } catch (error) {
            log.error("Failed to add product", error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    )
};