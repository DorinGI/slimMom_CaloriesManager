import express from 'express';
import {
  addProduct,
  removeProduct,
  getDailyLog,
} from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-product', authMiddleware, addProduct);
router.delete('/remove-product/:id', authMiddleware, removeProduct);
router.get('/daily-log/:date', authMiddleware, getDailyLog);

export default router;
