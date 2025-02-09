import DailyLog from '../models/DailyLog.js';

export const addProduct = async (req, res) => {
  const { date, product, calories } = req.body;
  const userId = req.user.userId;

  try {
    let log = await DailyLog.findOne({ user: userId, date });
    if (!log) {
      log = new DailyLog({ user: userId, date, products: [] });
    }
    log.products.push({ name: product, calories });
    await log.save();

    res.status(201).json({ msg: 'Produs adăugat' });
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server' });
  }
};

// Funcția pentru a șterge un produs
export const removeProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const log = await DailyLog.findOne({ user: userId, date: req.body.date });
    if (!log) {
      return res.status(404).json({ msg: 'Logul nu a fost găsit' });
    }

    // Căutăm produsul după id și îl ștergem
    log.products = log.products.filter(
      product => product._id.toString() !== id
    );
    await log.save();

    res.status(200).json({ msg: 'Produs șters cu succes' });
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server' });
  }
};

// Funcția pentru a obține logul zilnic
export const getDailyLog = async (req, res) => {
  const { date } = req.params;
  const userId = req.user.userId;

  try {
    const log = await DailyLog.findOne({ user: userId, date });
    if (!log) {
      return res.status(404).json({ msg: 'Logul zilnic nu a fost găsit' });
    }
    res.json(log);
  } catch (error) {
    res.status(500).json({ msg: 'Eroare server' });
  }
};
