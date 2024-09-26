import mongoose, {Schema, Document, Model} from "mongoose";

// define interface for user | admin document 
export interface IUser extends Document {
    name: string; 
    email: string; 
    password: string; 
    role: 'user' | 'admin'; 
    createdAt?: Date;
}; 

export interface IUserInput {
    name: string; 
    email: string; 
    password: string; 
    role?: 'user' | 'admin'; 
}

// create schema for the above interface 
const userSchema: Schema = new Schema<IUser>({
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    password: {type: String, required: true}, 
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
},
 {timestamps: true}
); 

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema); 
