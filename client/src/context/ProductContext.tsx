import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { IProduct, IProductInput } from '../models/productModel';
import { addProduct as apiAddProduct, getProducts, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '../services/productService';
import log from '../utils/logger';
import { AuthContext } from './AuthContext'; // Import AuthContext and its type

// Define the shape of the Product context
interface ProductContextType {
    products: IProduct[];
    addProduct: (productData: IProductInput) => Promise<void>;
    updateProduct: (id: string, productData: Partial<IProduct>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    lastUpdated: Date | null;
}

// Create the Product Context
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Product Provider Component
export const ProductProvider: React.FC<{ children: ReactNode; fetchProducts?: boolean }> = ({ children, fetchProducts = true }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const authContext = useContext(AuthContext); // Get auth context
    const user = authContext?.user; // Use optional chaining to safely access user
    const [isProductsFetched, setIsProductsFetched] = useState(false);

    // useEffect to fetch products based on the fetchProducts flag
    useEffect(() => {
        const fetchProducts = async () => {
            if (isProductsFetched || !user) return; // Prevent multiple fetches and check if authenticated
            try {
                const fetchedProducts = await getProducts();
                console.log('Fetched Products:', fetchedProducts); // For debugging
                setProducts(fetchedProducts);
                setIsProductsFetched(true);
                const latestUpdate = fetchedProducts.reduce((latest, product) => {
                    const productLastUpdated = new Date(product.lastUpdated);
                    return productLastUpdated > latest ? productLastUpdated : latest;
                }, new Date(0));
                setLastUpdated(latestUpdate);
            } catch (error) {
                console.error('Failed to fetch products in context', error);
            }
        };
        
        if (fetchProducts && user) {
            fetchProducts(); // Only fetch if the fetchProducts flag is true and user is authenticated
        }
    }, [fetchProducts, user]); // Add fetchProducts and user as dependencies

    // Function to add a product
    const addProduct = async (productData: IProductInput) => {
        if (!user) {
            log.warn('User not authenticated, cannot add product');
            return; // Abort if not authenticated
        }
        try {
            const newProduct = await apiAddProduct(productData);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setLastUpdated(new Date());
        } catch (error) {
            log.error("Failed to add product", error);
        }
    };

    // Function to update a product
    const updateProduct = async (id: string, productData: Partial<IProduct>) => {
        if (!user) {
            log.warn('User not authenticated, cannot update product');
            return; // Abort if not authenticated
        }
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

    // Function to delete a product
    const deleteProduct = async (_id: string) => {
        if (!user) {
            log.warn('User not authenticated, cannot delete product');
            return; // Abort if not authenticated
        }
        try {
            await apiDeleteProduct(_id);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== _id));
            setLastUpdated(new Date());
        } catch (error) {
            log.error('Failed to delete product', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, lastUpdated }}>
            {children}
        </ProductContext.Provider>
    );
};
