import { Router } from "express";
import * as userController from '../../src/controllers/userController'; 
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter: Router = Router(); 

//Authentication routes 
userRouter.post('/auth/register', userController.addUserController); 
userRouter.post('/auth/login', userController.loginUserController); 


//User routes (protected)
userRouter.get('/users/:id',authMiddleware, userController.getUserByIdController); 
userRouter.get('/users',authMiddleware, userController.getAllUsersController); 
userRouter.put('/users/:id',authMiddleware, userController.updateUserController); 
userRouter.delete('/users/:id',authMiddleware, userController.deleteUserController); 



export default userRouter; 