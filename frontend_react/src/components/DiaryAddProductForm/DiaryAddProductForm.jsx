import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToDiary } from '../../redux/diarySlice';
import styles from './DiaryAddProductForm.module.css';
import axios from 'axios';

const DiaryAddProductForm = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [weight, setWeight] = useState('');

  // Fetch product suggestions
  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`http://localhost:5000/api/products/search?q=${query}`)
        .then(res => setSuggestions(res.data))
        .catch(err => console.error(err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectProduct = product => {
    setSelectedProduct(product);
    setQuery(product.title);
    setSuggestions([]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!selectedProduct || !weight) {
      alert('Please select a product and enter a weight.');
      return;
    }

    const calories = (selectedProduct.calories * weight) / 100; // Calculate calories

    const newProduct = {
      date: selectedDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      gram: Number(weight),
      productId: selectedProduct._id || '',
      name: selectedProduct.title,
      calories,
    };

    await axios.post('http://localhost:5000/api/dailylog', newProduct, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    dispatch(addProductToDiary(newProduct));

    setQuery('');
    setSelectedProduct(null);
    setWeight('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Add Product</h3>

      {/* Product Search Input */}
      <input
        type="text"
        placeholder="Search food..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className={styles.input}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map(product => (
            <li key={product._id} onClick={() => handleSelectProduct(product)}>
              {product.title}
            </li>
          ))}
        </ul>
      )}

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
