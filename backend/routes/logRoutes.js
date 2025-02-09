import express from 'express';
import {
  getDailyIntake,
  getPrivateDailyIntake,
} from '../controllers/logController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/daily-intake', getDailyIntake);
router.get('/private-daily-intake', authMiddleware, getPrivateDailyIntake);

export default router;
