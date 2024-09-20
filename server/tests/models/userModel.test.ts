import { describe, it, beforeAll, afterAll, beforeEach, expect } from "vitest";
import mongoose from "mongoose";
import { User, IUser } from "../../src/models/userModel";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer; 

describe('User model test suite', () => {
    beforeAll(async () => {
        // start MongoDB Memory Server 
        mongoServer = await MongoMemoryServer.create(); 
        const mongoUri = mongoServer.getUri(); 

        // connect to MongoDB Memory Server 
        await mongoose.connect(mongoUri); 
    }); 

    afterAll(async () => {
        // Stop MongoDB Memory Server 
        await mongoServer.stop(); 

        // Disconnect from MongoDB 
        await mongoose.disconnect(); 
    }); 

    beforeEach(async () => {
        // clear the connection before each test 
        await User.deleteMany({}); 
    }); 

    it('should create and save a user succesfully', async () => {
        const userData: Partial<IUser> = {
            name: 'someName', 
            email: 'someEmail@mail.com', 
            password: 'somePassword', 
        }; 

        const user = new User(userData); 
        const savedUser = await user.save(); 

        expect(savedUser._id).toBeDefined(); 
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email); 
        expect(savedUser.role).toBe('user'); 
    });

    it('should create and save a user succesfully', async () => {
        const userData: Partial<IUser> = {
            name: 'someName', 
            email: 'someEmail@mail.com', 
            password: 'somePassword', 
            role: 'admin'
        }; 

        const user = new User(userData); 
        const savedUser = await user.save(); 

        expect(savedUser._id).toBeDefined(); 
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email); 
        expect(savedUser.role).toBe('admin'); 
    });
})