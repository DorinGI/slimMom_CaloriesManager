import express from 'express';
import {
  getAllProducts,
  getSearchedProducts,
  getRestrictedProducts,
  addProductToDailyLog,
  removeProductFromDailyLog,
  getDailyLog,
} from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';

const router = express.Router();

// Search products by title
router.get('/products/search', getSearchedProducts);

// ✅ Obține toate produsele
router.get('/products', getAllProducts);

// ✅ Obține produsele interzise pentru o anumită grupă de sânge
router.post('/daily-intake', getRestrictedProducts);

// ✅ Adaugă un produs în jurnal (autentificare necesară)
router.post('/dailylog', authMiddleware, addProductToDailyLog);

// ✅ Șterge un produs din jurnal (autentificare necesară)
router.delete('/dailylog', authMiddleware, removeProductFromDailyLog);

// ✅ Obține jurnalul zilnic (autentificare necesară)
router.get('/dailylog/:date', authMiddleware, getDailyLog);

export default router;
