import express from 'express';
import {
  getAllProducts,
  getRestrictedProducts,
  addProductToDailyLog,
  removeProductFromDailyLog,
  getDailyLog,
} from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Obține toate produsele
router.get('/products', getAllProducts);

// ✅ Obține produsele interzise pentru o anumită grupă de sânge
router.post('/daily-intake', getRestrictedProducts);

// ✅ Adaugă un produs în jurnal (autentificare necesară)
router.post('/daily-log', authMiddleware, addProductToDailyLog);

// ✅ Șterge un produs din jurnal (autentificare necesară)
router.delete('/daily-log/:id', authMiddleware, removeProductFromDailyLog);

// ✅ Obține jurnalul zilnic (autentificare necesară)
router.get('/daily-log/:date', authMiddleware, getDailyLog);

export default router;
