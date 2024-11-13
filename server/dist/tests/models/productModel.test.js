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
const productModel_1 = require("../../src/models/productModel");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
(0, vitest_1.describe)('Product model test suite', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        // Start MongoDB Memory Server
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        // Connect to MongoDB Memory Server
        yield mongoose_1.default.connect(mongoUri);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        // Stop MongoDB Memory Server
        yield mongoServer.stop();
        // Disconnect from MongoDB
        yield mongoose_1.default.disconnect();
    }));
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear the collection before each test
        yield productModel_1.Product.deleteMany({});
    }));
    (0, vitest_1.it)('should create and save a product successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const productData = {
            name: 'Sample Product',
            quantity: 10,
            price: 29.99
        };
        const product = new productModel_1.Product(productData);
        const savedProduct = yield product.save();
        (0, vitest_1.expect)(savedProduct._id).toBeDefined();
        (0, vitest_1.expect)(savedProduct.name).toBe(productData.name);
        (0, vitest_1.expect)(savedProduct.quantity).toBe(productData.quantity);
        (0, vitest_1.expect)(savedProduct.price).toBe(productData.price);
    }));
});
