import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import mongoose from 'mongoose';
import { Product, IProduct } from '../../src/models/productModel'; 
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

describe('Product model test suite', () => {
    beforeAll(async () => {
        // Start MongoDB Memory Server
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        // Connect to MongoDB Memory Server
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        // Stop MongoDB Memory Server
        await mongoServer.stop();
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        // Clear the collection before each test
        await Product.deleteMany({});
    });

    it('should create and save a product successfully', async () => {
        const productData: Partial<IProduct> = {
            name: 'Sample Product',
            quantity: 10,
            price: 29.99
        };

        const product = new Product(productData);
        const savedProduct = await product.save();

        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe(productData.name);
        expect(savedProduct.quantity).toBe(productData.quantity);
        expect(savedProduct.price).toBe(productData.price);
    });


});
