import { IProduct, IProductInput } from "../models/productModel";
import api from "../services/api";
import log from "../utils/logger";

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await api.get('/products'); 
        return response.data;
    } catch (error) {
        log.error('Error fetching all products:', error); 
        throw error;
    }
}; 

export const getProductById = async (id: string): Promise <IProduct | null> => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        log.error(`Error fetching product by id: ${id}`, error);
        throw error;
    }
}

export const addProduct = async (productData: IProductInput): Promise <IProduct> => {
    try {
        const response = await api.post('/products', productData); 
        return response.data;
    } catch (error) {
        log.error("Error adding product", error); 
        throw error;
    }
};

export const updateProduct = async (id: string, update: Partial<IProduct>): Promise <IProduct> => {
    try {
        const response = await api.put(`/products/${id}`, update);
        return response.data; 
    } catch (error) {
        log.error('Error updating product', error);
        throw error;
    }
}; 

export const deleteProduct = async (_id: string): Promise<void> => {
    if (!_id) {
        throw new Error('Product ID is required');
    }
    try {
        await api.delete(`/products/${_id}`);
    } catch (error) {
        log.error('Error deleting product', error); 
        throw error; 
    }
}; 