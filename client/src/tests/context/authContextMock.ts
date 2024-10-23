import { IUser } from "../../models/userModel";

export const authContextMock = (overrides = {}) => ({
    user: {
      id: '1',
      name: 'Test User',
      role: 'admin',
      ...overrides, 
    } as IUser,
    logout: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  });
  