import express from 'express';
const router = express.Router();
import DailyRate from '../models/DailyRate.js';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/daily-intake-user', authMiddleware, async (req, res) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

    const userId = req.user.userId;
    let userDailyRate = await DailyRate.findOne({ user: userId });
    // console.log('DailyRateCurrentUser:', userDailyRate);

    // console.log('Primit din Frontend:', req.body);
    if (
      height &&
      age &&
      currentWeight &&
      desiredWeight &&
      bloodType !== undefined
    ) {
      // console.log('Actualizare DailyRate pentru utilizator:', userId);

      // Calculăm noul dailyRate
      const dailyRate = Math.round(
        10 * currentWeight +
          6.25 * height -
          5 * age -
          161 -
          (currentWeight - desiredWeight) * 10
      );

      // Obținem lista de produse nerecomandate
      const restrictedProductsObj = await Product.find({
        [`groupBloodNotAllowed.${bloodType}`]: true,
      });

      const restrictedProducts = restrictedProductsObj.map(
        product => product.title
      );

      if (userDailyRate) {
        // Dacă există înregistrare, o actualizăm
        userDailyRate.dailyRate = dailyRate;
        userDailyRate.notAllowedProducts = restrictedProducts;
        await userDailyRate.save();
      } else {
        // Dacă nu există, creăm o nouă înregistrare
        userDailyRate = new DailyRate({
          user: userId,
          dailyRate,
          notAllowedProducts: restrictedProducts,
          summaries: [],
        });
        await userDailyRate.save();
      }
      return res.json({
        kcal: userDailyRate.dailyRate,
        restrictedProducts,
      });
    }
    // Dacă req.body este gol, doar returnăm datele existente (fără update)
    if (userDailyRate) {
      return res.json({
        kcal: userDailyRate.dailyRate,
        restrictedProducts: userDailyRate.notAllowedProducts,
      });
    } else {
      return res.status(404).json({ message: 'No Data for this User.' });
    }
  } catch (error) {
    console.error('Error processing daily intake:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
