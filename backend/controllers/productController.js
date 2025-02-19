import DailyLog from '../models/DailyLog.js';
import Product from '../models/Product.js';

/**
 * ✅ Obține toate produsele din baza de date
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server', error });
  }
};

/**
 * ✅ Obține toate produsele cautate din baza de date
 */
export const getSearchedProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const products = await Product.find({
      title: { $regex: query, $options: 'i' }, // Case-insensitive search
    }).limit(10);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * ✅ Obține lista de produse nerecomandate pentru o anumită grupă de sânge
 */
export const getRestrictedProducts = async (req, res) => {
  const { height, desiredWeight, age, currentWeight, bloodType } = req.body;
  // console.log(req.body);
  if (
    !height ||
    !age ||
    !currentWeight ||
    !desiredWeight ||
    bloodType === undefined
  ) {
    return res.status(400).json({ msg: 'Toate câmpurile sunt obligatorii' });
  }

  try {
    const restrictedProducts = await Product.find({
      [`groupBloodNotAllowed.${bloodType}`]: true, // Selectează produsele interzise pentru grupa specificată
    });

    const dailyCalories = Math.round(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        (currentWeight - desiredWeight) * 10
    );

    res.status(200).json({ kcal: dailyCalories, restrictedProducts });
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server', error });
  }
};

/**
 * ✅ Adaugă un produs în jurnalul zilnic
 */
export const addProductToDailyLog = async (req, res) => {
  const { date, product, calories, gram, name } = req.body;
  const userId = req.user.userId;

  try {
    let log = await DailyLog.findOne({ user: userId, date });

    if (!log) {
      log = new DailyLog({ user: userId, date, products: [] });
    }

    log.products.push({ name: product, calories, gram, name });
    await log.save();

    res.status(201).json({ msg: 'Produs adăugat în jurnal' });
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server', error });
  }
};

/**
 * ✅ Șterge un produs din jurnalul zilnic
 */
export const removeProductFromDailyLog = async (req, res) => {
  const { userId, date, productId } = req.body; // 👈 Primim userId, date și productId

  try {
    let log = await DailyLog.findOne({ user: userId, date });

    if (!log) {
      return res.status(404).json({ msg: 'Jurnalul zilnic nu a fost găsit' });
    }

    // ✅ Eliminăm doar produsul specific
    log.products = log.products.filter(
      product => product._id.toString() !== productId
    );

    await log.save();
    res.status(200).json({ msg: 'Produs șters din jurnal' });
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server', error });
  }
};

/**
 * ✅ Obține jurnalul zilnic al utilizatorului
 */
export const getDailyLog = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.params;

    const log = await DailyLog.findOne({ user: userId, date });

    if (!log) {
      return res.json({ products: [] });
    }

    res.json(log.products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
