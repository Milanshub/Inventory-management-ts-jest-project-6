"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const mongoose_1 = __importDefault(require("mongoose"));
const productService_1 = require("../../src/services/productService");
const productModel_1 = require("../../src/models/productModel");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const vitest_2 = require("vitest");
const logger_1 = require("../../src/utils/logger");
vitest_2.vi.mock('../../src/utils/logger', () => ({
    logger: {
        info: vitest_2.vi.fn(),
        error: vitest_2.vi.fn(),
    },
}));
let mongoServer;
(0, vitest_1.describe)('Product Service Tests', () => {
    // Start MongoDB Memory Server and connect 
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        yield mongoose_1.default.connect(uri);
    }));
    // stop Mongo Memory Server and disconnect from MongoDB 
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear the collection before each test
        yield productModel_1.Product.deleteMany({});
        // Clear all mock calls before each test
        vitest_2.vi.clearAllMocks();
    }));
    // creates mock object and check if it is added successfully 
    (0, vitest_1.it)('should add a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        const result = yield (0, productService_1.addProduct)(mockProductInput);
        (0, vitest_1.expect)(result).toHaveProperty('_id');
        (0, vitest_1.expect)(result.name).toBe(mockProductInput.name);
        (0, vitest_1.expect)(result.quantity).toBe(mockProductInput.quantity);
        (0, vitest_1.expect)(result.price).toBe(mockProductInput.price);
        (0, vitest_1.expect)(logger_1.logger.info).toHaveBeenCalledWith(`Added product: ${JSON.stringify(result)}`);
    }));
    (0, vitest_1.it)('should fail to add a product and log an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        vitest_2.vi.spyOn(productModel_1.Product.prototype, 'save').mockRejectedValueOnce(new Error('Save error'));
        yield (0, vitest_1.expect)((0, productService_1.addProduct)(mockProductInput)).rejects.toThrow('Save error');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith("Failed to add product: Save error");
    }));
    // creates mock object with no 'name' and tries to add 
    (0, vitest_1.it)('it should fail to add a product with missing name', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidProductInput = { quantity: 100, price: 50 };
        // @ts-ignore
        yield (0, vitest_1.expect)((0, productService_1.addProduct)(invalidProductInput)).rejects.toThrowError();
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith(vitest_1.expect.stringContaining('Failed to add product:'));
    }));
    // created mock object with wrong 'quantity' and tries to add
    (0, vitest_1.it)('should fail to add a product with invalid quantity', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidProductInput = { name: 'Sample Product', quantity: -10, price: 50 }; // Negative quantity
        yield (0, vitest_1.expect)((0, productService_1.addProduct)(invalidProductInput)).rejects.toThrowError();
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith(vitest_1.expect.stringContaining('Failed to add product:'));
    }));
    (0, vitest_1.it)('should fail to add a product with invalid price', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidProductInput = { name: 'name', quantity: 100, price: -50 };
        yield (0, vitest_1.expect)((0, productService_1.addProduct)(invalidProductInput)).rejects.toThrowError();
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith(vitest_1.expect.stringContaining('Failed to add product:'));
    }));
    // creates mock object that is added and then retrieved using getProductById
    (0, vitest_1.it)('should get a product by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        const addedProduct = yield (0, productService_1.addProduct)(mockProductInput);
        const addedProductWithId = addedProduct;
        // @ts-ignore
        const result = yield (0, productService_1.getProductById)(addedProductWithId._id.toString());
        (0, vitest_1.expect)(result).toMatchObject({
            _id: addedProductWithId._id,
            name: mockProductInput.name,
            quantity: mockProductInput.quantity,
            price: mockProductInput.price,
        });
        (0, vitest_1.expect)(logger_1.logger.info).toHaveBeenCalledWith(`Retrieved product: ${JSON.stringify(result)}`);
    }));
    (0, vitest_1.it)('should log an error and throw if getProductById is called with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalidId123';
        yield (0, vitest_1.expect)((0, productService_1.getProductById)(invalidId)).rejects.toThrow('Invalid product ID');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to retreive products invalidId123: Invalid product ID');
    }));
    // Returns null if invalid ID 
    (0, vitest_1.it)('should return null for an invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = '123456789012345678901234'; // Example of an invalid MongoDB ID
        const result = yield (0, productService_1.getProductById)(invalidId);
        (0, vitest_1.expect)(result).toBeNull();
    }));
    // creates 2 mock objects and checks if they are retrieved with getAllProducts 
    (0, vitest_1.it)('should get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const product1 = { name: 'Product 1', quantity: 10, price: 25 };
        const product2 = { name: 'Product 2', quantity: 5, price: 15 };
        yield (0, productService_1.addProduct)(product1);
        yield (0, productService_1.addProduct)(product2);
        const products = yield (0, productService_1.getAllProducts)();
        (0, vitest_1.expect)(products).toHaveLength(2);
        (0, vitest_1.expect)(products).toEqual(vitest_1.expect.arrayContaining([
            vitest_1.expect.objectContaining(product1),
            vitest_1.expect.objectContaining(product2),
        ]));
        (0, vitest_1.expect)(logger_1.logger.info).toHaveBeenCalledWith(`Retrieved all products: ${products.length} found`);
    }));
    (0, vitest_1.it)('should fail to getAllProducts and log an error', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_2.vi.spyOn(productModel_1.Product, 'find').mockRejectedValueOnce(new Error('Find error'));
        yield (0, vitest_1.expect)((0, productService_1.getAllProducts)()).rejects.toThrow('Find error');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to retrieve all products: Find error');
    }));
    // created a mock object and adds updated data using updateProduct
    (0, vitest_1.it)('should update a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        const addedProduct = yield (0, productService_1.addProduct)(mockProductInput);
        const addedProductWithId = addedProduct;
        const updateData = { quantity: 200 };
        // @ts-ignore
        const updatedProduct = yield (0, productService_1.updateProduct)(addedProductWithId._id.toString(), updateData);
        // @ts-ignore
        const updatedProductWithId = updatedProduct;
        (0, vitest_1.expect)(updatedProductWithId.quantity).toBe(200);
        (0, vitest_1.expect)(updatedProductWithId.name).toBe(mockProductInput.name);
    }));
    (0, vitest_1.it)('should log an error and throw if updateProduct is called with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalidId123';
        const updateData = { name: 'someName' };
        yield (0, vitest_1.expect)((0, productService_1.updateProduct)(invalidId, updateData)).rejects.toThrow('Invalid product ID!');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to update product with ID invalidId123: Invalid product ID!');
    }));
    // returns null if updating with incorrect id 
    (0, vitest_1.it)('should return null when updating a non-existent product', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = '123456789012345678901234';
        const result = yield (0, productService_1.updateProduct)(nonExistentId, { quantity: 100 });
        (0, vitest_1.expect)(result).toBeNull();
    }));
    // created a mock object and deletes using deleteProduct 
    (0, vitest_1.it)('should delete a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductInput = { name: 'Sample Product', quantity: 100, price: 50 };
        const addedProduct = yield (0, productService_1.addProduct)(mockProductInput);
        const addedProductWithId = addedProduct;
        // @ts-ignore
        const result = yield (0, productService_1.deleteProduct)(addedProductWithId._id.toString());
        (0, vitest_1.expect)(result).toBe(true);
        // @ts-ignore
        const checkDeletedProduct = yield (0, productService_1.getProductById)(addedProductWithId._id.toString());
        (0, vitest_1.expect)(checkDeletedProduct).toBeNull();
    }));
    (0, vitest_1.it)('should log an error and throw if deleteProduct is called with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalidId123';
        yield (0, vitest_1.expect)((0, productService_1.deleteProduct)(invalidId)).rejects.toThrow('Invalid product ID!');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to delete product with id invalidId123: Invalid product ID!');
    }));
    // Returns null non-existing product 
    (0, vitest_1.it)('should return false when deleting a non-existent product', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = '123456789012345678901234';
        const result = yield (0, productService_1.deleteProduct)(nonExistentId);
        (0, vitest_1.expect)(result).toBe(false);
    }));
});
