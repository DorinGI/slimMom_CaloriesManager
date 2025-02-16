import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    required: true,
    validate: [
      arr => arr.length === 5,
      'Trebuie să fie exact 5 valori în array',
    ],
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
