// import Product from '../models/Product.js';
// // Funcție pentru calculul necesarului zilnic de calorii
// const calculateCalories = ({
//   height,
//   age,
//   weight,
//   desiredWeight,
//   bloodType,
// }) => {
//   // Formula pentru calculul caloriilor (exemplu simplu, poate fi îmbunătățită)
//   return Math.round(
//     10 * weight + 6.25 * height - 5 * age - 161 + (desiredWeight - weight) * 10
//   );
// };

// // Endpoint pentru calculul necesarului caloric și obținerea produselor nerecomandate
// export const getDailyIntake = async (req, res) => {
//   try {
//     const { height, age, weight, desiredWeight, bloodType } = req.body;

//     if (!height || !age || !weight || !desiredWeight || !bloodType) {
//       return res
//         .status(400)
//         .json({ message: 'Toate câmpurile sunt obligatorii!' });
//     }

//     // Calculează necesarul zilnic de calorii
//     const dailyCalories = calculateCalories({
//       height,
//       age,
//       weight,
//       desiredWeight,
//       bloodType,
//     });

//     // Găsește produsele nerecomandate pentru grupa de sânge primită
//     const restrictedProducts = await Product.find({
//       [`groupBloodNotAllowed.${bloodType}`]: true,
//     });

//     // Trimite răspunsul
//     res.json({
//       dailyCalories,
//       restrictedProducts: restrictedProducts.map(product => product.title),
//     });
//   } catch (error) {
//     console.error('Eroare la obținerea datelor:', error);
//     res
//       .status(500)
//       .json({ message: 'Eroare server. Încearcă din nou mai târziu.' });
//   }
// };
