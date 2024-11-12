import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { addProduct, getProductById, getAllProducts, updateProduct, deleteProduct } from '../../src/services/productService';
import { Product, IProduct } from '../../src/models/productModel';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { vi } from 'vitest';
import { logger } from '../../src/utils/logger';

vi.mock('../../src/utils/logger', () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
    },
}));

let mongoServer: MongoMemoryServer;

describe('Product Service Tests', () => {
    // Start MongoDB Memory Server and connect 
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    // stop Mongo Memory Server and disconnect from MongoDB 
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Clear the collection before each test
        await Product.deleteMany({});
        // Clear all mock calls before each test
        vi.clearAllMocks();
    });

    // creates mock object and check if it is added successfully 
    it('should add a product successfully', async () => {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };

        const result = await addProduct(mockProductInput);

        expect(result).toHaveProperty('_id');
        expect(result.name).toBe(mockProductInput.name);
        expect(result.quantity).toBe(mockProductInput.quantity);
        expect(result.price).toBe(mockProductInput.price);

        expect(logger.info).toHaveBeenCalledWith(`Added product: ${JSON.stringify(result)}`)
    });

    it('should fail to add a product and log an error', async () => {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };

        vi.spyOn(Product.prototype, 'save').mockRejectedValueOnce(new Error('Save error'));

        await expect(addProduct(mockProductInput)).rejects.toThrow('Save error');
        
        expect(logger.error).toHaveBeenCalledWith("Failed to add product: Save error")
    }); 

    // creates mock object with no 'name' and tries to add 
    it('it should fail to add a product with missing name',async () => {
        const invalidProductInput = { quantity: 100, price: 50 }; 
        // @ts-ignore
        await expect(addProduct(invalidProductInput)).rejects.toThrowError();
    
        expect(logger.error).toHaveBeenCalledWith(
            expect.stringContaining('Failed to add product:')
        );
    })

    // created mock object with wrong 'quantity' and tries to add
    it('should fail to add a product with invalid quantity', async () => {
        const invalidProductInput = { name: 'Sample Product', quantity: -10, price: 50 }; // Negative quantity
    
        await expect(addProduct(invalidProductInput)).rejects.toThrowError();
    
        expect(logger.error).toHaveBeenCalledWith(
            expect.stringContaining('Failed to add product:')
        );
    });

    it('should fail to add a product with invalid price', async () => {
        const invalidProductInput = { name: 'name', quantity: 100, price: -50 };
    
        await expect(addProduct(invalidProductInput)).rejects.toThrowError();
    
        expect(logger.error).toHaveBeenCalledWith(
            expect.stringContaining('Failed to add product:')
        );
    });

    // creates mock object that is added and then retrieved using getProductById
    it('should get a product by ID', async () => {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };

        const addedProduct = await addProduct(mockProductInput);

        const addedProductWithId = addedProduct as IProduct;

        // @ts-ignore
        const result = await getProductById(addedProductWithId._id.toString());

        expect(result).toMatchObject({
            _id: addedProductWithId._id,
            name: mockProductInput.name,
            quantity: mockProductInput.quantity,
            price: mockProductInput.price,
        });

        expect(logger.info).toHaveBeenCalledWith(`Retrieved product: ${JSON.stringify(result)}`)
    });

    it('should log an error and throw if getProductById is called with invalid ID', async () => {
        const invalidId = 'invalidId123';
    
        await expect(getProductById(invalidId)).rejects.toThrow('Invalid product ID');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to retreive products invalidId123: Invalid product ID');
      });

    // Returns null if invalid ID 
    it('should return null for an invalid ID', async () => {
        const invalidId = '123456789012345678901234'; // Example of an invalid MongoDB ID
        const result = await getProductById(invalidId);
        expect(result).toBeNull();
    });

    // creates 2 mock objects and checks if they are retrieved with getAllProducts 
    it('should get all products', async () => {
        const product1 = { name: 'Product 1', quantity: 10, price: 25 };
        const product2 = { name: 'Product 2', quantity: 5, price: 15 };
        
        await addProduct(product1);
        await addProduct(product2);

        const products = await getAllProducts();
        expect(products).toHaveLength(2);
        expect(products).toEqual(
            expect.arrayContaining([
                expect.objectContaining(product1),
                expect.objectContaining(product2),
            ])
        );

        expect(logger.info).toHaveBeenCalledWith(`Retrieved all products: ${products.length} found`)
    });

    it('should fail to getAllProducts and log an error', async () => {
        vi.spyOn(Product, 'find').mockRejectedValueOnce(new Error('Find error'));

        await expect(getAllProducts()).rejects.toThrow('Find error');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to retrieve all products: Find error');
    })

    // created a mock object and adds updated data using updateProduct
    it('should update a product successfully', async () => {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        const addedProduct = await addProduct(mockProductInput);

        const addedProductWithId = addedProduct as IProduct;

        const updateData = { quantity: 200 };

        // @ts-ignore
        const updatedProduct = await updateProduct(addedProductWithId._id.toString(), updateData);

        // @ts-ignore
        const updatedProductWithId = updatedProduct as IProduct;

        expect(updatedProductWithId.quantity).toBe(200);
        expect(updatedProductWithId.name).toBe(mockProductInput.name);
        
    });

    it('should log an error and throw if updateProduct is called with invalid ID', async () => {
        const invalidId = 'invalidId123';
        const updateData = { name: 'someName' };
    
        await expect(updateProduct(invalidId, updateData)).rejects.toThrow('Invalid product ID!');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to update product with ID invalidId123: Invalid product ID!');
      });

    // returns null if updating with incorrect id 
    it('should return null when updating a non-existent product', async () => {
        const nonExistentId = '123456789012345678901234';
        const result = await updateProduct(nonExistentId, { quantity: 100 });
        expect(result).toBeNull();
    });

    // created a mock object and deletes using deleteProduct 
    it('should delete a product successfully', async () => {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        const addedProduct = await addProduct(mockProductInput);

      
        const addedProductWithId = addedProduct as IProduct;
        // @ts-ignore
        const result = await deleteProduct(addedProductWithId._id.toString());
        expect(result).toBe(true);

        // @ts-ignore
        const checkDeletedProduct = await getProductById(addedProductWithId._id.toString());
        expect(checkDeletedProduct).toBeNull();

    });

    it('should log an error and throw if deleteProduct is called with invalid ID', async () => {
        const invalidId = 'invalidId123';
    
        await expect(deleteProduct(invalidId)).rejects.toThrow('Invalid product ID!');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to delete product with id invalidId123: Invalid product ID!');
      });

    // Returns null non-existing product 
    it('should return false when deleting a non-existent product', async () => {
        const nonExistentId = '123456789012345678901234';
        const result = await deleteProduct(nonExistentId);
        expect(result).toBe(false);
    });
});
