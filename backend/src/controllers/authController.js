import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import CustomError from '../utils/customError.js';
import config from '../config/config.js';


// Send token in cookie
const sendToken = (user, statusCode, res) => {
            const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
                        expiresIn: config.JWT_EXPIRE
            });

            const message = statusCode === 201 ? "Registered successfully" : "Login successfully"
            res.status(statusCode)
                        .cookie('token', token, {
                                    httpOnly: true,
                                    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
                                    secure: config.NODE_ENV === 'production',
                                    maxAge: 7 * 24 * 60 * 60 * 1000
                        })
                        .json({
                                    success: true,
                                    message,
                                    user: {
                                                _id: user._id,
                                                name: user.name,
                                                email: user.email,
                                                avatar: user.avatar
                                    }
                        });
};

// Register
export const register = asyncHandler(async (req, res, next) => {
            const { name, email, password, skillsToTeach, skillsToLearn } = req.body;

            if (!name || !email || !password) {
                        throw new CustomError("All fields are required", 400);
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                        throw new CustomError("User already exists", 409);
            }


            let avatar = {};
            if (req.file) {
                        avatar = {
                                    public_id: req.file.filename,
                                    url: `/uploads/${req.file.filename}`
                        };
            }

            const user = await User.create({
                        name,
                        email,
                        password,
                        avatar,
                        skillsToTeach: skillsToTeach || [],
                        skillsToLearn: skillsToLearn || []
            });

            sendToken(user, 201, res);
});

// Login
export const login = asyncHandler(async (req, res, next) => {
            const { email, password } = req.body;
            if (!email || !password) {
                        throw new CustomError("Email and password are required", 400);
            }

            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                        throw new CustomError("Invalid credentials", 401);
            }

            const isMatch = user.comparePassword(password);
            if (!isMatch) {
                        throw new CustomError("Invalid credentials", 401);
            }

            sendToken(user, 200, res);
});

// Logout
export const logout = asyncHandler(async (req, res, next) => {
            res.cookie('token', '', {
                        httpOnly: true,
                        expires: new Date(0)
            }).json({ success: true, message: "Logged out" });
});

export const profile = asyncHandler(async (req, res, next) => {
            res.status(200).json({ success: true, user: req.user });
});

export const updateProfile = asyncHandler(
            async (req, res) => {
                        const userId = req.user._id;
                        const { name, bio, skillsToTeach, skillsToLearn, avatar } = req.body;

                        const updatedUser = await User.findByIdAndUpdate(
                                    userId,
                                    {
                                                name,
                                                bio,
                                                avatar,
                                                skillsToTeach,
                                                skillsToLearn
                                    },
                                    { new: true }
                        );

                        res.status(200).json({
                                    success: true,
                                    message: "Profile updated",
                                    user: updatedUser
                        });
            }
);

export const singleUser = asyncHandler(
            async (req, res) => {
                        const userId = req.params.id;
                        const user = await User.findById(userId)
                        if (!user) {
                                    throw new CustomError("User not found", 404);
                        }
                        res.status(200).json({ success: true, user });
            }
)
