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
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.getProductById = exports.addProduct = void 0;
const logger_1 = require("../utils/logger");
const productModel_1 = require("../models/productModel");
const mongoose_1 = __importDefault(require("mongoose"));
const addProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new productModel_1.Product(Object.assign(Object.assign({}, productData), { lastUpdated: new Date() }));
        yield newProduct.save();
        logger_1.logger.info(`Added product: ${JSON.stringify(newProduct)}`);
        return newProduct;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to add product: ${error.message}`);
        }
        else {
            logger_1.logger.error('An unknown error occurred while adding new product');
        }
        throw error;
    }
});
exports.addProduct = addProduct;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid product ID');
        }
        const product = yield productModel_1.Product.findById(id);
        if (!product) {
            logger_1.logger.error(`Product with ${id} not found`);
            return null;
        }
        logger_1.logger.info(`Retrieved product: ${JSON.stringify(product)}`);
        return product;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to retreive products ${id}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error occurred while retrieving products with id ${id}`);
        }
        throw error;
    }
});
exports.getProductById = getProductById;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.Product.find();
        logger_1.logger.info(`Retrieved all products: ${products.length} found`);
        return products;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to retrieve all products: ${error.message}`);
        }
        else {
            logger_1.logger.error('An uknown error occured while retrieving products');
        }
        throw error;
    }
});
exports.getAllProducts = getAllProducts;
const updateProduct = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid product ID!");
        }
        const updatedProduct = yield productModel_1.Product.findByIdAndUpdate(id, Object.assign(Object.assign({}, update), { lastUpdated: new Date() }), { new: true });
        if (!updatedProduct) {
            logger_1.logger.error(`Product with ID ${id} not found!`);
            return null;
        }
        logger_1.logger.info(`Updated product with ID ${JSON.stringify(updatedProduct)}`);
        return updatedProduct;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to update product with ID ${id}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error occurred while updating product with ID ${id}`);
        }
        throw error;
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid product ID!');
        }
        const deletedProduct = yield productModel_1.Product.findByIdAndDelete(id, { lastUpdated: new Date(), deleted: true });
        if (!deletedProduct) {
            logger_1.logger.error(`Product with id ${id} is not found`);
            return false;
        }
        logger_1.logger.info(`Deleted new product with id ${JSON.stringify(deletedProduct)}`);
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to delete product with id ${id}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error occurred while deleting product with id ${id}`);
        }
        throw error;
    }
});
exports.deleteProduct = deleteProduct;
