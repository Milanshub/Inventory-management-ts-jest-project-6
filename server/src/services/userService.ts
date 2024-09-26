import { logger } from "../utils/logger";
import { IUser, IUserInput, User } from "../models/userModel";
import mongoose from "mongoose";

export const addUser = async (userData: IUserInput): Promise<IUser> => {
    try {
        const newUser = new User(userData); 
        await newUser.save(); 
        logger.info(`Added user: ${JSON.stringify(newUser)}`); 
        return newUser
    } catch (error) {
        if (error instanceof Error) {
        logger.error(`failed to add user: ${error.message}`);
        } else {
            logger.error('An unknown error occurred while adding new user'); 
        }
        throw error; 
    }
};

export const getUserById = async (id: string): Promise <IUser | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user ID"); 
        }
        const user = await User.findById(id); 
        if (!user) {
            logger.error(`User with ${id} not found`);
            return null; 
        }
        logger.info(`Retreived user: ${JSON.stringify(user)}`); 
        return user;
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to retreive user ${id}: ${error.message}`);
        } else {
            logger.error(`An unknown error occurred while retreiving user with id: ${id}`)
        }
        throw error; 
    }
};

export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const users = await User.find(); 
        logger.info(`Retreived all users: ${users.length} found`); 
        return users; 
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to retreive all users: ${error.message}`); 
        } else {
            logger.error('An unkown error occurred while retreiving all users'); 
        }
        throw error; 
    }
}; 

export const updateUser = async (id: string, update: Partial<IUserInput>): Promise <IUser | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid user ID!'); 
        }
        const updateUser = await User.findByIdAndUpdate(id, update, {new: true});
        if (!updateUser) {
            logger.error(`User with id ${id} not found`); 
            return null;
        }
        logger.info(`Updated new user with id ${JSON.stringify(updateUser)}`); 
        return updateUser;
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to update new user with id ${id}: ${error.message}`); 
        } else {
            logger.error(`An unknown error occurred while update user with id ${id}`); 
        }
        throw error; 
    }
}; 

export const deleteUser = async (id: string): Promise<boolean> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid user ID!"); 
        }
        const deletedUser = await User.findByIdAndDelete(id); 
        if (!deletedUser) {
            logger.error(`Product with id ${id} is not found!`); 
            return false 
        }
        logger.info(`Deleted user with id ${JSON.stringify(deletedUser)}`);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Failed to delete user with id ${id}: ${error.message}`); 
        } else {
            logger.error(`An unknown error has occurred while deleting user with id ${id}`); 
        }
        throw error; 
    }
}