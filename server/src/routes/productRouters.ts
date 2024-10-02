import { Router } from "express";
import * as productController from '../../src/controllers/productController'; 

const productRouter: Router = Router(); 

productRouter.post('/products', productController.addProductController); 

productRouter.get('/products/:id', productController.getProductByIdController); 

productRouter.get('/products', productController.getAllProductsController); 

productRouter.put('/products/:id', productController.updateProductController); 

productRouter.delete('/products/:id', productController.deleteProductController); 

export default productRouter;
