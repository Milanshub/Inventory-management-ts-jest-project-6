import React, { createContext, useState, ReactNode } from 'react';
import { IProduct, IProductInput } from '../models/productModel';
import { addProduct as apiAddProduct, getProducts, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct} from '../services/productService';
import log from '../utils/logger';

interface ProductContextType {
    products: IProduct[];
    addProduct: (productData: IProductInput) => Promise<void>; 
    fetchProducts: () => Promise<void>;
    updateProduct: (id: string, productData: Partial<IProduct>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined); 

export const ProductProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [ products, setProducts] = useState<IProduct[]>([]); 

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getProducts();
            
            // Update state only if the fetched products are different from the current state
            if (JSON.stringify(fetchedProducts) !== JSON.stringify(products)) {
                setProducts(fetchedProducts); 
            }
        } catch (error) {
            log.error('Failed to fetch products', error);
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

    const updateProduct = async (id: string, productData: Partial<IProduct>) => {
        try {
            const updatedProduct = await apiUpdateProduct(id, productData);
            setProducts(prevProducts => 
                prevProducts.map(product => (product._id === id ? updatedProduct : product))
            );
        } catch (error) {
            log.error("Failed to update product", error);
        }
    };

    const deleteProduct = async (_id: string) => {
        console.log("Attempting to delete product with ID:", _id);
        try {
            await apiDeleteProduct(_id); 
            setProducts(prevProducts => prevProducts.filter(product => product._id !== _id));
        } catch (error) {
            log.error('Failed to delete product', error);
        }
    }; 

    return (
        <ProductContext.Provider value={{ products, addProduct, fetchProducts, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    )
};