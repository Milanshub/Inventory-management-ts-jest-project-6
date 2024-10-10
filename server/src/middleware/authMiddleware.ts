import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 

dotenv.config();

// This should be the same secret key used to sign the tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Extend the Request type to include userId
interface AuthenticatedRequest extends Request {
    userId?: string; // Add userId as an optional property
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        res.status(401).json({ message: 'No token provided' }); 
        return;// Send error response
    }

    jwt.verify(token, JWT_SECRET!, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({ message: 'Unauthorized' }); // Send error response
        }

        // Type assertion to treat decoded as jwt.JwtPayload
        req.userId = (decoded as jwt.JwtPayload).id; // Save user ID from decoded token
        next(); // Call next() to pass control to the next middleware/route handler
    });
};
