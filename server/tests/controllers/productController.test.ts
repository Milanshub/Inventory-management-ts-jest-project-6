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
import { IProduct} from '../../src/models/productModel';


const mockRequest = (body: any, params: any = {}): Partial<Request> => ({
    body,
    params,  
});

const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = vi.fn().mockReturnThis(); 
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

    it('should get a product by ID', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const mockProduct = {
            _id: mockProductId,
            name: 'Sample Product',
            quantity: 100,
            price: 50,
        } as Partial<IProduct> as IProduct;
    
    
        const reqGet = mockRequest({}, { id: mockProductId });
        const resGet = mockResponse();
    
     
        const getProductSpy = vi.spyOn(productService, 'getProductById').mockResolvedValue(mockProduct);
    
  
        await getProductByIdController(reqGet as Request, resGet as Response);
    
  
        expect(getProductSpy).toHaveBeenCalledWith(mockProductId); 
        expect(resGet.status).toHaveBeenCalledWith(200); 
        expect(resGet.json).toHaveBeenCalledWith(mockProduct); 
    });
    
    it('should return 404 when the product is not found',async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';

        const reqGet = mockRequest({}, { id: mockProductId });
        const resGet = mockResponse();

        const getProductSpy = vi.spyOn(productService, 'getProductById').mockResolvedValue(null); 
        
        await getProductByIdController(reqGet as Request, resGet as Response);
        
        expect(getProductSpy).toHaveBeenCalledWith(mockProductId);
        expect(resGet.status).toHaveBeenCalledWith(404);
        expect(resGet.json).toHaveBeenCalledWith({ error: 'Product not found' });
    }); 

    it('should get all products', async () => {
        const mockProducts = [
            { _id: new mongoose.Types.ObjectId(), name: 'Product A', quantity: 2, price: 100 },
            { _id: new mongoose.Types.ObjectId(), name: 'Product B', quantity: 5, price: 200 },
        ] as IProduct[];

        const req = mockRequest({});
        const res = mockResponse();

        const getAllProductsSpy = vi.spyOn(productService, 'getAllProducts').mockResolvedValue(mockProducts);

        await getAllProductsController(req as Request, res as Response);

        expect(getAllProductsSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors when getting all products and return 500', async () => {
        const req = mockRequest({});
        const res = mockResponse();

        const errorMessage = 'Error fetching products';
        const getAllProductsSpy = vi.spyOn(productService, 'getAllProducts').mockRejectedValue(new Error(errorMessage));

        await getAllProductsController(req as Request, res as Response);

        expect(getAllProductsSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should update a product', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'Updated Product', quantity: 3, price: 150 }, { id: mockProductId });
        const res = mockResponse();

        const updatedProduct = { _id: mockProductId, name: 'Updated Product', quantity: 3, price: 150 } as IProduct;

        const updateProductSpy = vi.spyOn(productService, 'updateProduct').mockResolvedValue(updatedProduct);

        await updateProductController(req as Request, res as Response);

        expect(updateProductSpy).toHaveBeenCalledWith(mockProductId, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedProduct);
    });

    it('should return 404 when updating a product that does not exist', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'Updated Product', quantity: 3, price: 150 }, { id: mockProductId });
        const res = mockResponse();

        const updateProductSpy = vi.spyOn(productService, 'updateProduct').mockResolvedValue(null); 

        await updateProductController(req as Request, res as Response);

        expect(updateProductSpy).toHaveBeenCalledWith(mockProductId, req.body);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product not found!' });
    });


    it('should handle errors when updating a product and return 500', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'Updated Product', quantity: 3, price: 150 }, { id: mockProductId });
        const res = mockResponse();

        const errorMessage = 'Error updating product';
        const updateProductSpy = vi.spyOn(productService, 'updateProduct').mockRejectedValue(new Error(errorMessage));

        await updateProductController(req as Request, res as Response);

        expect(updateProductSpy).toHaveBeenCalledWith(mockProductId, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should delete a product', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockProductId });
        const res = mockResponse();

        const deletedProduct = { _id: mockProductId, name: 'Product A', quantity: 2, price: 100 } as IProduct;
        // @ts-ignore
        const deleteProductSpy = vi.spyOn(productService, 'deleteProduct').mockResolvedValue(deletedProduct);

        await deleteProductController(req as Request, res as Response);

        expect(deleteProductSpy).toHaveBeenCalledWith(mockProductId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully', data: deletedProduct });
    });

    it('should return 404 when deleting a product that does not exist', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockProductId });
        const res = mockResponse();
        // @ts-ignore
        const deleteProductSpy = vi.spyOn(productService, 'deleteProduct').mockResolvedValue(null); 

        await deleteProductController(req as Request, res as Response);

        expect(deleteProductSpy).toHaveBeenCalledWith(mockProductId);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product not found!' });
    });

    it('should handle errors when deleting a product and return 500', async () => {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockProductId });
        const res = mockResponse();

        const errorMessage = 'Error deleting product';
        const deleteProductSpy = vi.spyOn(productService, 'deleteProduct').mockRejectedValue(new Error(errorMessage));

        await deleteProductController(req as Request, res as Response);

        expect(deleteProductSpy).toHaveBeenCalledWith(mockProductId);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
})