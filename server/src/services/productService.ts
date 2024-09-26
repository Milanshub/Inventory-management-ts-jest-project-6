import { logger } from "../utils/logger";
import { IProduct, IProductInput, Product } from "../models/productModel";
import mongoose from "mongoose";

export const addProduct = async (productData: IProductInput): Promise<IProduct> => {
    try {
        const newProduct = new Product(productData); 
        await newProduct.save(); 
        logger.info(`Added product: ${JSON.stringify(newProduct)}`); 
        return newProduct; 
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`failed to add product: ${error.message}`);
        } else {
            logger.error('An unknown error ocurred while adding new product ')
        }
        throw error; 
    }
};

export const getProductById = async (id: string): Promise< IProduct | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid product ID')
        } 
        const product = await Product.findById(id); 
        if (!product) {
            logger.error(`Product with ${id} not found`); 
            return null;
        } 
        logger.info(`Retrieved product: ${JSON.stringify(product)}`); 
        return product; 
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to retreive products ${id}: ${error.message}`);
        } else {
            logger.error(`An unknown error occurred while retrieving products with id ${id}`)
        }
        throw error;
    }
}


export const getAllProducts = async (): Promise <IProduct[]> => {
    try {
        const products= await Product.find(); 
        logger.info(`Retrieved all products: ${products.length} found`); 
        return products
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to retrieve all products: ${error.message}`); 
        } else {
            logger.error('An uknown error occured while retrieving products')
        }
        throw error; 
    }
}; 

export const updateProduct = async (id: string, update: Partial<IProductInput>): Promise <IProduct | null> => {
     try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product ID!"); 
        }
        const updateProduct = await Product.findByIdAndUpdate(id, update, { new: true }); 
        if (!updateProduct) {
            logger.error(`Product with id ${id} not found!`);
            return null;
        }
        logger.info(`Updated new product with id ${JSON.stringify(updateProduct)}`); 
        return updateProduct;
        } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to update new product with id ${id}: ${error.message}`); 
        } else {
            logger.error(`An unknown error occurred while update product with id ${id}`); 
        }
        throw error; 
    }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid product ID!')
        }
        const deletedProduct = await Product.findByIdAndDelete(id); 
        if (!deletedProduct) {
            logger.error(`Product with id ${id} is not found`); 
            return false;
        }
        logger.info(`Deleted new product with id ${JSON.stringify(deletedProduct)}`); 
        return true; 
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to delete product with id ${id}: ${error.message}`);
        } else {
            logger.error(`An unknown error occurred while deleting product with id ${id}`); 
        }
        throw error; 
    }
}; 



