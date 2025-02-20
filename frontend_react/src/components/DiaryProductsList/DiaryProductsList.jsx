import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProductFromDiary } from '../../redux/diarySlice';
import axios from 'axios';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ selectedDate, onRefresh }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const dateString = selectedDate.toISOString().split('T')[0];
      try {
        const res = await axios.get(
          `http://localhost:5000/api/dailylog/${dateString}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // console.log('API Response:', res.data); // ✅ Debugging

        if (Array.isArray(res.data)) {
          setProducts(res.data); // ✅ Setăm direct lista de produse
        } else {
          setProducts([]); // Dacă nu este un array, resetăm lista
        }
      } catch (error) {
        console.error('Error fetching daily log:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [selectedDate, onRefresh]);

  const handleRemoveProduct = async productId => {
    const userId = localStorage.getItem('userId'); // 👈 Ia userId din localStorage
    const date = selectedDate.toISOString().split('T')[0]; // 👈 Formatăm data

    try {
      await axios.delete('http://localhost:5000/api/dailylog', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { userId, date, productId }, // 👈 Trimitem datele în body
      });

      // ✅ Update state pentru a elimina produsul din UI
      setProducts(prevProducts =>
        prevProducts.filter(product => product._id !== productId)
      );

      dispatch(removeProductFromDiary(productId));
      onRefresh();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Food List for {selectedDate.toDateString()}</h3>

      {products.length === 0 ? (
        <p className={styles.noProducts}>No products added yet.</p>
      ) : (
        <ul className={styles.list}>
          {products.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span>
                {item.name} - {item.calories} kcal
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => handleRemoveProduct(item._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiaryProductsList;
