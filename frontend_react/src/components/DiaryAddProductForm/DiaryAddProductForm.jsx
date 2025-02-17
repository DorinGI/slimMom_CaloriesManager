import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToDiary } from '../../redux/diarySlice';
import styles from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!product || !weight) {
      alert('Please enter a product name and weight.');
      return;
    }

    const newProduct = {
      date: selectedDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      product,
      weight: Number(weight),
    };

    dispatch(addProductToDiary(newProduct));

    setProduct('');
    setWeight('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Add Product</h3>

      {/* Product Name Input */}
      <input
        type="text"
        placeholder="Enter food name..."
        value={product}
        onChange={e => setProduct(e.target.value)}
        className={styles.input}
      />

      {/* Weight Input */}
      <input
        type="number"
        placeholder="Weight (grams)"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        className={styles.input}
      />

      {/* Submit Button */}
      <button type="submit" className={styles.addButton}>
        Add
      </button>
    </form>
  );
};

export default DiaryAddProductForm;
