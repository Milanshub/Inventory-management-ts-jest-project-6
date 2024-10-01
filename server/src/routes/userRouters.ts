import { Router } from "express";
import * as userController from '../../src/controllers/userController'; 

const userRouter: Router = Router(); 

userRouter.post('/', userController.addUserController); 

userRouter.get('/:id', userController.getUserByIdController); 

userRouter.get('/', userController.getAllUsersController); 

userRouter.put('/:id', userController.updateUserController); 

userRouter.delete('/:d', userController.deleteUserController); 

export default userRouter; 