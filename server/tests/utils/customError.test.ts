import { describe, it, expect } from 'vitest';
import { BadRequestError, UnauthorizedError, NotFoundError, InternalServerError, CustomError } from '../../src/utils/customErrors';

describe('CustomErro classes', () => {
    it('should create a BadRequestError with correct message and StatusCode', () => {
        const error = new BadRequestError('Bad Request'); 
        expect(error).toBeInstanceOf(CustomError); 
        expect(error.statusCode).toBe(400); 
        expect(error.message).toBe('Bad Request'); 
    }); 

    it('should create UnauthorizedError with default message and correct StatusCode', () => {
        const error = new UnauthorizedError(); 
        expect(error).toBeInstanceOf(CustomError); 
        expect(error.statusCode).toBe(401); 
        expect(error.message).toBe('Unauthorized');
    });

    it('should create NotFoundError with correct mesage and StatusCode', () => {
        const error = new NotFoundError('Resource not found'); 
        expect(error).toBeInstanceOf(CustomError); 
        expect(error.statusCode).toBe(404); 
        expect(error.message).toBe('Resource not found'); 
    }); 

    it('should create InternalServerError with default message and StatusCode', () => {
        const error = new InternalServerError(); 
        expect(error).toBeInstanceOf(CustomError);
        expect(error.statusCode).toBe(500); 
        expect(error.message).toBe('Internal Server Error'); 
    });

    it('should create InternalServerError with custom message', () => {
        const error = new InternalServerError('Something went wrong');
        expect(error).toBeInstanceOf(CustomError);
        expect(error.statusCode).toBe(500);
        expect(error.message).toBe('Something went wrong'); 
      });
}); 
