"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const productService = __importStar(require("../../src/services/productService"));
const productController_1 = require("../../src/controllers/productController");
const mongoose_1 = __importDefault(require("mongoose"));
const mockRequest = (body, params = {}) => ({
    body,
    params,
});
const mockResponse = () => {
    const res = {};
    res.status = vitest_1.vi.fn().mockReturnThis();
    res.json = vitest_1.vi.fn().mockReturnThis();
    return res;
};
(0, vitest_1.describe)('productController test suite', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should add a product and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: 'Product A', quantity: 2, price: 100 });
        const res = mockResponse();
        // Mock the service behavior
        const mockProduct = { _id: new mongoose_1.default.Types.ObjectId(), name: 'Product', quantity: 2, price: 100 };
        const addProductSpy = vitest_1.vi.spyOn(productService, 'addProduct').mockResolvedValue(mockProduct);
        yield (0, productController_1.addProductController)(req, res);
        (0, vitest_1.expect)(addProductSpy).toHaveBeenCalledWith(req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(201);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(mockProduct);
    }));
    (0, vitest_1.it)('should handle errors when adding a product and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: 'Product A', quantity: 2, price: 100 });
        const res = mockResponse();
        const errorMessage = 'Error adding product';
        const addProductSpy = vitest_1.vi.spyOn(productService, 'addProduct').mockRejectedValue(new Error(errorMessage));
        yield (0, productController_1.addProductController)(req, res);
        (0, vitest_1.expect)(addProductSpy).toHaveBeenCalledWith(req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    (0, vitest_1.it)('should get a product by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const mockProduct = {
            _id: mockProductId,
            name: 'Sample Product',
            quantity: 100,
            price: 50,
        };
        const reqGet = mockRequest({}, { id: mockProductId });
        const resGet = mockResponse();
        const getProductSpy = vitest_1.vi.spyOn(productService, 'getProductById').mockResolvedValue(mockProduct);
        yield (0, productController_1.getProductByIdController)(reqGet, resGet);
        (0, vitest_1.expect)(getProductSpy).toHaveBeenCalledWith(mockProductId);
        (0, vitest_1.expect)(resGet.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(resGet.json).toHaveBeenCalledWith(mockProduct);
    }));
    (0, vitest_1.it)('should return 404 when the product is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const reqGet = mockRequest({}, { id: mockProductId });
        const resGet = mockResponse();
        const getProductSpy = vitest_1.vi.spyOn(productService, 'getProductById').mockResolvedValue(null);
        yield (0, productController_1.getProductByIdController)(reqGet, resGet);
        (0, vitest_1.expect)(getProductSpy).toHaveBeenCalledWith(mockProductId);
        (0, vitest_1.expect)(resGet.status).toHaveBeenCalledWith(404);
        (0, vitest_1.expect)(resGet.json).toHaveBeenCalledWith({ error: 'Product not found' });
    }));
    (0, vitest_1.it)('should get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProducts = [
            { _id: new mongoose_1.default.Types.ObjectId(), name: 'Product A', quantity: 2, price: 100 },
            { _id: new mongoose_1.default.Types.ObjectId(), name: 'Product B', quantity: 5, price: 200 },
        ];
        const req = mockRequest({});
        const res = mockResponse();
        const getAllProductsSpy = vitest_1.vi.spyOn(productService, 'getAllProducts').mockResolvedValue(mockProducts);
        yield (0, productController_1.getAllProductsController)(req, res);
        (0, vitest_1.expect)(getAllProductsSpy).toHaveBeenCalled();
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(mockProducts);
    }));
    (0, vitest_1.it)('should handle errors when getting all products and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({});
        const res = mockResponse();
        const errorMessage = 'Error fetching products';
        const getAllProductsSpy = vitest_1.vi.spyOn(productService, 'getAllProducts').mockRejectedValue(new Error(errorMessage));
        yield (0, productController_1.getAllProductsController)(req, res);
        (0, vitest_1.expect)(getAllProductsSpy).toHaveBeenCalled();
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    (0, vitest_1.it)('should update a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'Updated Product', quantity: 3, price: 150 }, { id: mockProductId });
        const res = mockResponse();
        const updatedProduct = { _id: mockProductId, name: 'Updated Product', quantity: 3, price: 150 };
        const updateProductSpy = vitest_1.vi.spyOn(productService, 'updateProduct').mockResolvedValue(updatedProduct);
        yield (0, productController_1.updateProductController)(req, res);
        (0, vitest_1.expect)(updateProductSpy).toHaveBeenCalledWith(mockProductId, req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(updatedProduct);
    }));
    (0, vitest_1.it)('should return 404 when updating a product that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'Updated Product', quantity: 3, price: 150 }, { id: mockProductId });
        const res = mockResponse();
        const updateProductSpy = vitest_1.vi.spyOn(productService, 'updateProduct').mockResolvedValue(null);
        yield (0, productController_1.updateProductController)(req, res);
        (0, vitest_1.expect)(updateProductSpy).toHaveBeenCalledWith(mockProductId, req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(404);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Product not found!' });
    }));
    (0, vitest_1.it)('should handle errors when updating a product and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'Updated Product', quantity: 3, price: 150 }, { id: mockProductId });
        const res = mockResponse();
        const errorMessage = 'Error updating product';
        const updateProductSpy = vitest_1.vi.spyOn(productService, 'updateProduct').mockRejectedValue(new Error(errorMessage));
        yield (0, productController_1.updateProductController)(req, res);
        (0, vitest_1.expect)(updateProductSpy).toHaveBeenCalledWith(mockProductId, req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    (0, vitest_1.it)('should delete a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockProductId });
        const res = mockResponse();
        const deletedProduct = { _id: mockProductId, name: 'Product A', quantity: 2, price: 100 };
        // @ts-ignore
        const deleteProductSpy = vitest_1.vi.spyOn(productService, 'deleteProduct').mockResolvedValue(deletedProduct);
        yield (0, productController_1.deleteProductController)(req, res);
        (0, vitest_1.expect)(deleteProductSpy).toHaveBeenCalledWith(mockProductId);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully', data: deletedProduct });
    }));
    (0, vitest_1.it)('should return 404 when deleting a product that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockProductId });
        const res = mockResponse();
        // @ts-ignore
        const deleteProductSpy = vitest_1.vi.spyOn(productService, 'deleteProduct').mockResolvedValue(null);
        yield (0, productController_1.deleteProductController)(req, res);
        (0, vitest_1.expect)(deleteProductSpy).toHaveBeenCalledWith(mockProductId);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(404);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Product not found!' });
    }));
    (0, vitest_1.it)('should handle errors when deleting a product and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProductId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockProductId });
        const res = mockResponse();
        const errorMessage = 'Error deleting product';
        const deleteProductSpy = vitest_1.vi.spyOn(productService, 'deleteProduct').mockRejectedValue(new Error(errorMessage));
        yield (0, productController_1.deleteProductController)(req, res);
        (0, vitest_1.expect)(deleteProductSpy).toHaveBeenCalledWith(mockProductId);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
