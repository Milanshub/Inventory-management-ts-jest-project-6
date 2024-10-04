import axios from 'axios'; 
import log from '@/utils/logger';
import {IUser, IUserInput} from '../models/userModel'

const REACT_APP_API_URL = 'http://localhost:5000/api';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const loginUser = async (email: string, password: string):Promise<IUser> => {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/users/login`, {email, password}, {headers: defaultHeaders}); 
        return response.data;
    } catch (error) {
        log.error('Error logging user', error); 
        throw error;
    }
}

export const registerUser = async (useData: IUserInput): Promise <IUser> => {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/users/register`, useData, {headers:defaultHeaders}); 
        return response.data;
    } catch (error) {
        log.error("Error adding user", error);
        throw error;
    }
};

export const fetchUserById = async (id: string): Promise <IUser | null> => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/users/${id}`, {headers: defaultHeaders}); 
        return response.data;
    } catch (error) {
        log.error(`Error fetching user by id: ${id}`, error);
        throw error;
    }
}; 

export const fetchAllUsers = async (): Promise <IUser[]> => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/users`,  {headers: defaultHeaders}); 
        return response.data;
    } catch (error) {
        log.error('Error fetching all users', error); 
        throw error;
    }
}; 

export const updateUser = async (id: string, update: Partial<IUser>): Promise <IUser> => {
    try {
        const response = await axios.put(`${REACT_APP_API_URL}/users/${id}`, update, {headers: defaultHeaders}); 
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
        await axios.delete(`${REACT_APP_API_URL}/users/${id}`, {headers: defaultHeaders}); 
    } catch (error) {
        log.error('Error deleting user', error); 
        throw error; 
    }
}; 


