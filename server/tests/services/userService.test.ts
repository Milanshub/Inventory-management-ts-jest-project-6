import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import {addUser, getUserById, getAllUsers, updateUser, deleteUser} from "../../src/services/userService"; 
import { logger } from '../../src/utils/logger';
import mongoose from 'mongoose';
import { IUser, IUserInput, User } from '../../src/models/userModel';
import { MongoMemoryServer } from 'mongodb-memory-server';

vi.mock('../../src/utils/logger', () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
    },
}));

let mongoServer: MongoMemoryServer; 

describe.skip('userService test suite', () => {
     // Start MongoDB Memory Server and connect 
     beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    // stop Mongo Memory Server and disconnect from MongoDB 
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Clear the collection before each test
        await User.deleteMany({});
        // Clear all mock calls before each test
        vi.clearAllMocks();
    });

    it.skip('should add a user successfully',async () => {
        const mockUserInput = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 

       const result = await addUser(mockUserInput); 

       expect(result).toHaveProperty('_id'); 
       expect(result.name).toBe(mockUserInput.name); 
       expect(result.email).toBe(mockUserInput.email); 
       expect(result.password).toBe(mockUserInput.password); 
       expect(result.role).toBe(mockUserInput.role); 

       expect(logger.info).toHaveBeenCalledWith(`Added user: ${JSON.stringify(result)}`)
    }); 

    it('should fail to add a user and log an error', async () => {
        const mockUserInput = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 

        vi.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('Save error'));

        await expect(addUser(mockUserInput)).rejects.toThrow('Save error');

        expect(logger.error).toHaveBeenCalledWith('failed to add user: Save error');
    })


    it.skip('should get a user by ID', async () => {
        const mockUserInput = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 

        const addedUSer = await addUser(mockUserInput);
        
        const addedUserWithId = addedUSer as IUser; 

        // @ts-ignore
        const result = await getUserById(addedUserWithId._id.toString()); 

        expect(result).toMatchObject({
            _id: addedUserWithId._id,
            name: mockUserInput.name, 
            email: mockUserInput.email, 
            password: mockUserInput.password, 
            role: mockUserInput.role
        }); 

        expect(logger.info).toHaveBeenCalledWith(`Retreived user: ${JSON.stringify(result)}`)
    }); 

    it('should log an error and throw if getUserById is called with invalid ID', async () => {
        const invalidId = 'invalidId123';
    
        await expect(getUserById(invalidId)).rejects.toThrow('Invalid user ID');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to retreive user invalidId123: Invalid user ID');
      });


    it('should return null for an invalid ID', async () => {
        const invalidId = '123456789012345678901234'; // Example of an invalid MongoDB ID
        const result = await getUserById(invalidId);
        expect(result).toBeNull();
    });

    it.skip('should get all user', async () => {
        const mockUserInput1 = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 
        const mockUserInput2 = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 

        await addUser(mockUserInput1); 
        await addUser(mockUserInput2); 

        const users = await getAllUsers(); 

        expect(users).toHaveLength(2); 
        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining(mockUserInput1), 
                expect.objectContaining(mockUserInput2),
            ])
        ); 

        expect(logger.info).toHaveBeenCalledWith(`Retreived all users: ${users.length} found`)
    }); 

    it('should fail to getAllUsers and log an error', async () => {
        vi.spyOn(User, 'find').mockRejectedValueOnce(new Error('Find error'));

        await expect(getAllUsers()).rejects.toThrow('Find error');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to retreive all users: Find error');
    })

    it.skip('should updated a user succesfully',async () => {
        const mockUserInput1 = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 
        const addedUser = await addUser(mockUserInput1); 

        // @ts-ignore
        const addeddUserWithId = addedUser as IUser; 

        const updateData = {email: 'emailSome'}; 
        // @ts-ignore
        const updatedUser = await updateUser(addeddUserWithId._id.toString(), updateData); 

        const updatedUserWithId = updatedUser as IUser;

        expect(updatedUserWithId.email).toBe("emailSome"); 
        expect(updatedUserWithId.name).toBe(mockUserInput1.name)
    });

    it('should log an error and throw if updateUser is called with invalid ID', async () => {
        const invalidId = 'invalidId123';
        const updateData = { email: 'newEmail' };
    
        await expect(updateUser(invalidId, updateData)).rejects.toThrow('Invalid user ID!');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to update new user with id invalidId123: Invalid user ID!');
      });

    it('should return null when updating a non-existent user',async () => {
        const nonExistentId = '123456789012345678901234';
        const result = await updateUser(nonExistentId, {email: 'someEmail'});  
        expect(result).toBeNull(); 
    })

    it.skip('should delete a user succesfully', async () => {
        const mockUserInput1 = {
            name: "someUser", 
            email: "someEmail", 
            password: "somePassword", 
            role: 'user' as 'user'
        }; 

        const addedUser = await addUser(mockUserInput1); 

        const addedUserWithId = addedUser as IUser;
        // @ts-ignore
        const result = await deleteUser(addedUserWithId._id.toString()); 
        expect(result).toBe(true); 
        // @ts-ignore
        const checkDeletedUser = await getUserById(addedUserWithId._id.toString()); 
        expect(checkDeletedUser).toBeNull(); 
    }); 

    it('should log an error and throw if deleteUser is called with invalid ID', async () => {
        const invalidId = 'invalidId123';
    
        await expect(deleteUser(invalidId)).rejects.toThrow('Invalid user ID!');
    
        expect(logger.error).toHaveBeenCalledWith('Failed to delete user with id invalidId123: Invalid user ID!');
      });

    it('should return false wwhen deleting a non-existent product',async () => {
        const nonExistentId ='123456789012345678901234'; 
        const result = await deleteUser(nonExistentId); 
        expect(result).toBe(false); 
    })
})
