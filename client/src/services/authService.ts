import api from "./api";
import log from "../utils/logger";
import {IUser, IUserInput} from '../models/userModel'; 


export const loginUser = async (email: string, password: string): Promise<IUser> => {
    try {
      const response = await api.post(`/auth/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store the token in localStorage
      return response.data.user;
    } catch (error) {
      log.error('Error logging user', error);
      throw error;
    }
  };

export const registerUser = async (useData: IUserInput): Promise <IUser> => {
    try {
        const response = await api.post(`/auth/register`, useData); 
        return response.data;
    } catch (error) {
        log.error("Error adding user", error);
        throw error;
    }
};

export const logoutUser = async (): Promise <void> => {
    try {
        localStorage.removeItem('token');
        log.info('User logged out successfully.');
    } catch (error) {
        log.error('Error logging out user', error); 
        throw error;
    }
}; 
