export interface IUser {
    id: string;
    name: string;
    password?: string;
    role: 'user' | 'admin'; 
    createdAt?: Date;
};

export interface IUserInput {
    name: string;
    email: string;
    password: string; 
    role?: 'user' | 'admin'; 
};
