import express from 'express';
import { createChat, getMyChats, getUserChats } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createChat);
router.get('/', protect, getMyChats);
router.get("/user", protect, getUserChats)
export default router;
