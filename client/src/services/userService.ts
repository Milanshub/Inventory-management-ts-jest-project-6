import api from './api';
import log from '@/utils/logger';
import {IUser} from '../models/userModel'


export const fetchUserById = async (id: string): Promise <IUser | null> => {
    try {
        const response = await api.get(`/users/${id}`); 
        return response.data;
    } catch (error) {
        log.error(`Error fetching user by id: ${id}`, error);
        throw error;
    }
}; 

export const fetchAllUsers = async (): Promise <IUser[]> => {
    try {
        const response = await api.get(`/users`); 
        return response.data;
    } catch (error) {
        log.error('Error fetching all users', error); 
        throw error;
    }
}; 

export const updateUser = async (id: string, update: Partial<IUser>): Promise <IUser> => {
    try {
        const response = await api.put(`/users/${id}`, update); 
        return response.data; 
    } catch (error) {
        log.error('Error updating user', error); 
        throw error;
    }
}; 

export const deletedUser = async (id: string): Promise <void> => {
    if (!id) {
        throw new Error('User ID is required!'); 
    }; 
    try {
        await api.delete(`/users/${id}`); 
    } catch (error) {
        log.error('Error deleting user', error); 
        throw error; 
    }
}; 


