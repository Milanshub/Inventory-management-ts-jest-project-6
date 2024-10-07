import { Request, Response } from "express";
import * as userService from '../services/userService'; 
import { IUserInput } from "../models/userModel";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'; 

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET;

type ExpressRequestHandle = (req: Request, res: Response ) => Promise <void>; 

export const addUserController: ExpressRequestHandle = async (req, res) => {
    try {
        const userData: IUserInput = req.body; 
        const newUser = await userService.addUser(userData); 
        res.status(201).json(newUser); 
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'})
    }
}; 


export const getUserByIdController: ExpressRequestHandle = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await userService.getUserById(userId); 
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found'}); 
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'}); 
    }
}; 

export const getAllUsersController: ExpressRequestHandle = async (_req, res) => {
    try {
        const users = await userService.getAllUsers(); 
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({  message: error instanceof Error ? error.message : 'An unknown error occurred'}); 
    }
}; 

export const updateUserController: ExpressRequestHandle = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = req.body 
        const updatedUser = await userService.updateUser(userId, user); 
        if (updatedUser) {
            res.status(200).json(updatedUser); 
        } else {
            res.status(404).json({ message: 'User not found!'}); 
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'}); 
    }
}; 

export const deleteUserController: ExpressRequestHandle = async (req, res) => {
    try {
        const userId = req.params.id; 
        const deletedUser = await userService.deleteUser(userId)
        if (deletedUser) {
            res.status(200).json({message: 'User deleted successfully', data: deletedUser}); 
        } else {
            res.status(404).json({message: 'User not found!'}); 
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'}); 
    }
}; 

export const loginUserController: ExpressRequestHandle = async (req, res) => {
    try {
        const {email, password} = req.body; 
        const user = await userService.loginUser(email, password); 
        if (user) {
            // Create a token
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET!, {
                expiresIn: '1h', // Token expires in 1 hour
            });
            res.status(200).json({message: 'Login successful',token, user}); 
        } else {
            res.status(401).json('Invalud email or password'); 
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred'});
    }
};