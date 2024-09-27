import { describe, it, vi, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import * as productService from '../../src/services/productService'; 
import {
    addProductController, 
    getProductByIdController, 
    getAllProductsController, 
    updateProductController, 
    deleteProductController
} from '../../src/controllers/productController'; 
import mongoose from 'mongoose';
import { IProduct, IProductInput } from '../../src/models/productModel';


const mockRequest = (body: any): Partial<Request> => ({
    body
});

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnThis();  // Chainable method
    res.json = vi.fn().mockReturnThis();
    return res;
};

describe('productController test suite', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should add a product and return 201',async () => {
        const req = mockRequest({ name: 'Product A', quantity: 2, price: 100});
        const res = mockResponse();
        // Mock the service behavior
        const mockProduct = {_id: new mongoose.Types.ObjectId(), name: 'Product',quantity: 2, price: 100}as Partial<IProduct> as IProduct;
        
        const addProductSpy = vi.spyOn(productService, 'addProduct').mockResolvedValue(mockProduct); 

        await addProductController(req as Request, res as Response); 

        expect(addProductSpy).toHaveBeenCalledWith(req.body); 
        expect(res.status).toHaveBeenCalledWith(201); 
        expect(res.json).toHaveBeenCalledWith(mockProduct); 
    }); 

    it('should handle errors when adding a product and return 500', async () => {
        const req = mockRequest({ name: 'Product A', quantity: 2, price: 100});
        const res = mockResponse();

        const errorMessage = 'Error adding product'; 
        const addProductSpy = vi.spyOn(productService, 'addProduct').mockRejectedValue(new Error(errorMessage)); 

        await addProductController(req as Request, res as Response);

        expect(addProductSpy).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }); 

    
})