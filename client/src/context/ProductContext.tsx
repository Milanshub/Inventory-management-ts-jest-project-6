import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { IProduct, IProductInput } from '../models/productModel';
import { addProduct as apiAddProduct, getProducts, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '../services/productService';
import log from '../utils/logger';

interface ProductContextType {
    products: IProduct[];
    addProduct: (productData: IProductInput) => Promise<void>;
    fetchProducts: () => Promise<void>;
    updateProduct: (id: string, productData: Partial<IProduct>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    lastUpdated: Date | null;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null); 
    const [isProductsFetched, setIsProductsFetched] = useState(false);


    const fetchProducts = async () => {
        if (isProductsFetched) return; // Prevent multiple fetches

        try {
            const fetchedProducts = await getProducts();
            console.log('Fetched Products:', fetchedProducts); // Add this for debugging
            if (JSON.stringify(fetchedProducts) !== JSON.stringify(products)) {
                setProducts(fetchedProducts);
                const latestUpdate = fetchedProducts.reduce((latest, product) => {
                    const productLastUpdated = new Date(product.lastUpdated);
                    return productLastUpdated > latest ? productLastUpdated : latest;
                }, new Date(0)); 
                setLastUpdated(latestUpdate); 
                setIsProductsFetched(true);
            }
        } catch (error) {
            console.error('Failed to fetch products in context', error);
        }
    };

    // useEffect(() => {
    //     fetchProducts();
    // }   );

    const addProduct = async (productData: IProductInput) => {
        try {
            const newProduct = await apiAddProduct(productData);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setLastUpdated(new Date()); 
        } catch (error) {
            log.error("Failed to add product", error);
        }
    };

    const updateProduct = async (id: string, productData: Partial<IProduct>) => {
        try {
            const updatedProduct = await apiUpdateProduct(id, productData);
            setProducts(prevProducts =>
                prevProducts.map(product => (product._id === id ? updatedProduct : product))
            );
            setLastUpdated(new Date()); 
        } catch (error) {
            log.error("Failed to update product", error);
        }
    };

    const deleteProduct = async (_id: string) => {
        try {
            await apiDeleteProduct(_id);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== _id));
            setLastUpdated(new Date()); 
        } catch (error) {
            log.error('Failed to delete product', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, fetchProducts, updateProduct, deleteProduct, lastUpdated }}>
            {children}
        </ProductContext.Provider>
    )
};
