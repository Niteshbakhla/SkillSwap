import express from 'express';
import { register, login, logout, profile, updateProfile, singleUser } from '../controllers/authController.js';
import upload from '../middleware/multer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get("/me", protect, profile);
router.patch('/profile', protect, updateProfile)
router.get("/user/:id", protect, singleUser);


export default router;
