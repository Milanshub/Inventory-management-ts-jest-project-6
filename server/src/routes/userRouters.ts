import { Router } from "express";
import * as userController from '../../src/controllers/userController'; 

const userRouter: Router = Router(); 

userRouter.post('/users/login', userController.addUserController); 

userRouter.get('/users/:id', userController.getUserByIdController); 

userRouter.get('/users', userController.getAllUsersController); 

userRouter.put('/users/:id', userController.updateUserController); 

userRouter.delete('/users/:d', userController.deleteUserController); 

userRouter.post('/users/login', userController.loginUserController); 

export default userRouter; 