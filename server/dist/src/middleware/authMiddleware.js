"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// This should be the same secret key used to sign the tokens
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Get token from Authorization header
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return; // Send error response
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({ message: 'Unauthorized' }); // Send error response
        }
        // Type assertion to treat decoded as jwt.JwtPayload
        req.userId = decoded.id; // Save user ID from decoded token
        next(); // Call next() to pass control to the next middleware/route handler
    });
};
exports.authMiddleware = authMiddleware;
