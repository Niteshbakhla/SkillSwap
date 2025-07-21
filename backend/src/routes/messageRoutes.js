import express from 'express';
import { sendMessage, getMessagesByChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:id', protect, getMessagesByChat);

export default router;
