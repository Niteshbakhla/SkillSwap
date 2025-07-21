import express from 'express';
import { sendRequest, getMyRequests, updateRequestStatus, createOffer, getOffer } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, sendRequest);
router.get('/', protect, getMyRequests);
router.patch('/:id', protect, updateRequestStatus);
router.post('/offer', protect, createOffer)
router.get("/offer", protect, getOffer);

export default router;
