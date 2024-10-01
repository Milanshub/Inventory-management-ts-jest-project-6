import { Router } from "express";
import * as productController from '../../src/controllers/productController'; 

const productRouter: Router = Router(); 

productRouter.post('/', productController.addProductController); 

productRouter.get('/:id', productController.getProductByIdController); 

productRouter.get('/', productController.getAllProductsController); 

productRouter.put('/:id', productController.updateProductController); 

productRouter.delete('/:id', productController.deleteProductController); 

export default productRouter;
