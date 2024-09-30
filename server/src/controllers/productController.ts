import { Request, Response } from "express";
import * as productService from '../services/productService'; 
import { IProductInput } from "../models/productModel";

type ExpressRequestHandle = (req: Request, res: Response) => Promise<void>;

export const addProductController: ExpressRequestHandle = async (req, res) => {
    try {
        const productData: IProductInput = req.body; 
        const newProduct = await productService.addProduct(productData); 
        res.status(201).json(newProduct); 
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'}); 
    }
}; 

export const getProductByIdController: ExpressRequestHandle = async (req, res) => {
    try {
        const productId = req.params.id; 
        const product = await productService.getProductById(productId); 
        if (product) {
            res.status(200).json(product); 
        } else {
            res.status(404).json({error: 'Product not found'}); 
        }
    } catch (error: any) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'}); 
    }
}; 


export const getAllProductsController: ExpressRequestHandle = async (_req, res) => {
    try {
        const products = await productService.getAllProducts(); 
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'});
    }
}; 

export const updateProductController: ExpressRequestHandle = async (req, res) => {
    try {
        const productId = req.params.id; 
        const productData = req.body; 
        const updatedProduct = await productService.updateProduct(productId, productData); 
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({message: 'Product not found!'}); 
        }
    } catch (error: any) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'});
    }
}; 

export const deleteProductController: ExpressRequestHandle = async (req, res) => {
    try { 
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId); 
        if (deletedProduct) {
            res.status(200).json({message: 'Product deleted successfully', data: deletedProduct}); 
        } else { 
            res.status(404).json({message: 'Product not found!'}); 
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'});
    }
}; 
