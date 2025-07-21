import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';
import config from '../config/config.js';
import CustomError from '../utils/customError.js';

export const protect = asyncHandler(async (req, res, next) => {
            // Get token from cookie
            const { token } = req.cookies;

            if (!token) {
                        throw new CustomError('Not authorized, no token', 401);
            }

            // Verify token
            const decoded = jwt.verify(token, config.JWT_SECRET);

            // Find user by ID (we skip password)
            const user = await User.findById(decoded.id);
            if (!user) {
                        throw new ErrorHandler('User not found', 404);
            }

            // Attach user to req
            req.user = user;
            next();
});


