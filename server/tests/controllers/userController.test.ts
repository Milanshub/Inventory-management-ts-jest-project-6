import { describe, it, vi, expect, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import * as userService from '../../src/services/userService'; 
import { 
   addUserController, 
   getUserByIdController, 
   getAllUsersController, 
   updateUserController, 
   deleteUserController 
} from '../../src/controllers/userController'; 
import mongoose from 'mongoose'; 
import { IUser } from '../../src/models/userModel';

const mockRequest = (body: any, params: any = {}): Partial<Request> => ({
    body, 
    params,
}); 

const mockResponse = (): Partial <Response> => {
    const res: Partial<Response> = {}; 
    res.status = vi.fn().mockReturnThis(); 
    res.json = vi.fn().mockReturnThis(); 
    return res; 
}; 

describe('userController test suite', () => {
    beforeEach(() => {
        vi.clearAllMocks(); 
    }); 

    it('should add a user and return 201', async () => {
        const req = mockRequest({ name: 'User A', email: 'someEmail', password: 'somePassword', role: 'user'}); 
        const res = mockResponse(); 

        const mockUser = {_id: new mongoose.Types.ObjectId(), name: 'User A', email: 'someEmail', password: 'somePassword', role: 'user'} as Partial<IUser> as IUser; 

        const addUserSpy = vi.spyOn(userService, 'addUser').mockResolvedValue(mockUser); 

        await addUserController(req as Request, res as Response); 

        expect(addUserSpy).toHaveBeenCalledWith(req.body); 
        expect(res.status).toHaveBeenCalledWith(201); 
        expect(res.json).toHaveBeenCalledWith(mockUser); 
    }); 

    it('should handle errors when adding a user and return 500', async () => {
        const req = mockRequest({ name: 'User A', email: 'someEmail', password: 'somePassword', role: 'user'}); 
        const res = mockResponse(); 

        const errorMessage = 'Error adding user'; 
        const addUserSpy = vi.spyOn(userService, 'addUser').mockRejectedValue(new Error(errorMessage)); 

        await addUserController(req as Request, res as Response); 

        expect(addUserSpy).toHaveBeenCalledWith(req.body); 
        expect(res.status).toHaveBeenCalledWith(500); 
        expect(res.json).toHaveBeenCalledWith({message: errorMessage}); 
    }); 

    it('should get a user by ID', async () => {
        const mockUserId = '66f6bde7ae953a38af97d7d7'; 
        const mockUser = {
            _id: mockUserId, 
            name: 'user A', 
            email: 'someEmail',
            password: 'somePassword', 
            role: 'user'
        } as Partial<IUser> as IUser; 

        const reqGet = mockRequest({}, { id: mockUserId}); 
        const resGet = mockResponse(); 

        const getUserSpy = vi.spyOn(userService, 'getUserById').mockResolvedValue(mockUser); 

        await getUserByIdController(reqGet as Request, resGet as Response); 

        expect(getUserSpy).toHaveBeenCalledWith(mockUserId); 
        expect(resGet.status).toHaveBeenCalledWith(200); 
        expect(resGet.json).toHaveBeenCalledWith(mockUser); 
    });

    it('should return 404 when the user is not found', async () => {
        const mockUserId = '66f6bde7ae953a38af97d7d7'; 

        const reqGet = mockRequest({}, {id: mockUserId}); 
        const resGet = mockResponse(); 

        const getUserSpy = vi.spyOn(userService, 'getUserById').mockResolvedValue(null); 

        await getUserByIdController(reqGet as Request, resGet as Response); 

        expect(getUserSpy).toHaveBeenCalledWith(mockUserId); 
        expect(resGet.status).toHaveBeenCalledWith(404); 
        expect(resGet.json).toHaveBeenCalledWith({ error: 'User not found'}); 
    }); 

    it('should get all users', async () => {
        const mockUsers = [
            {_id: new mongoose.Types.ObjectId(), name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user'}, 
            {_id: new mongoose.Types.ObjectId(), name: 'user B', email: 'someEmail2', password: 'somePassword2', role: 'user'},
        ] as IUser[]; 

        const req = mockRequest({}); 
        const res = mockResponse(); 

        const getAllUsersSpy = vi.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers); 

        await getAllUsersController(req as Request, res as Response);

        expect(getAllUsersSpy).toHaveBeenCalled(); 
        expect(res.status).toHaveBeenCalledWith(200); 
        expect(res.json).toHaveBeenCalledWith(mockUsers); 
    }); 

    it('should handle errors when getting all users and return 500', async () => {
        const req = mockRequest({}); 
        const res = mockResponse(); 

        const errorMessage = 'Error fetching users'; 
        const getAllUsersSpy = vi.spyOn(userService, 'getAllUsers').mockRejectedValue(new Error(errorMessage)); 

        await getAllUsersController(req as Request, res as Response); 

        expect(getAllUsersSpy).toHaveBeenCalled(); 
        expect(res.status).toHaveBeenCalledWith(500); 
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage});
    }); 

    it('should update a user', async () => {
        const mockUserId =  '66f6bde7ae953a38af97d7d7'; 
        const req = mockRequest({name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user'}, {id: mockUserId}); 
        const res = mockResponse(); 

        const updatedUser = { _id: mockUserId, name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user'} as IUser; 

        const updatedUserSpy = vi.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser); 

        await updateUserController(req as Request, res as Response);

        expect(updatedUserSpy).toHaveBeenCalledWith(mockUserId, req.body); 
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedUser); 
    });

    it('should return 404 when updating a user that does not exist', async () => {
        const mockUserId =  '66f6bde7ae953a38af97d7d7'; 
        const req = mockRequest({name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user'}, {id: mockUserId}); 
        const res = mockResponse(); 

        const updatedUserSpy = vi.spyOn(userService, 'updateUser').mockResolvedValue(null); 

        await updateUserController(req as Request, res as Response); 

        expect(updatedUserSpy).toHaveBeenCalledWith(mockUserId, req.body); 
        expect(res.status).toHaveBeenCalledWith(404); 
        expect(res.json).toHaveBeenCalledWith({message: 'User not found!'}); 
    }); 


    it('should handle error when updatig a user and return 500', async () => {
        const mockUserId =  '66f6bde7ae953a38af97d7d7'; 
        const req = mockRequest({name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user'}, {id: mockUserId}); 
        const res = mockResponse(); 

        const errorMessage = 'Error updating user'; 
        const updatedUserSpy = vi.spyOn(userService, 'updateUser').mockRejectedValue(new Error(errorMessage)); 

        await updateUserController(req as Request, res as Response); 

        expect(updatedUserSpy).toHaveBeenCalledWith(mockUserId, req.body); 
        expect(res.status).toHaveBeenCalledWith(500); 
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage}); 
    }); 

    it('shoudl delete a user', async () => {
        const mockUserId =  '66f6bde7ae953a38af97d7d7'; 
        const req = mockRequest({}, { id: mockUserId}); 
        const res = mockResponse(); 

        const deletedUser = { _id: mockUserId, name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user'} as IUser; 
        // @ts-ignore
        const deleteUserSpy = vi.spyOn(userService, 'deleteUser').mockResolvedValue(deletedUser); 

        await deleteUserController(req as Request, res as Response); 

        expect(deleteUserSpy).toHaveBeenCalledWith(mockUserId); 
        expect(res.status).toHaveBeenCalledWith(200); 
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully', data: deletedUser}); 
    }); 

    it('should return 404 when deleting a user that does not exits', async () => {
        const mockUserId =  '66f6bde7ae953a38af97d7d7'; 
        const req = mockRequest({}, { id: mockUserId}); 
        const res = mockResponse(); 
        // @ts-ignore
        const deleteUserSpy = vi.spyOn(userService, 'deleteUser').mockResolvedValue(null); 

        await deleteUserController(req as Request, res as Response); 

        expect(deleteUserSpy).toHaveBeenCalledWith(mockUserId); 
        expect(res.status).toHaveBeenCalledWith(404); 
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found!'}); 
    });

    it('should handle errors when deleting a user and return 500', async () => {
        const mockUserId =  '66f6bde7ae953a38af97d7d7'; 
        const req = mockRequest({}, { id: mockUserId}); 
        const res = mockResponse(); 

        const errorMessage = 'Error deleting user';
        const deleteUserSpy = vi.spyOn(userService, 'deleteUser').mockRejectedValue(new Error(errorMessage)); 

        await deleteUserController(req as Request, res as Response); 

        expect(deleteUserSpy).toHaveBeenCalledWith(mockUserId); 
        expect(res.status).toHaveBeenCalledWith(500); 
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage}); 
    });
});