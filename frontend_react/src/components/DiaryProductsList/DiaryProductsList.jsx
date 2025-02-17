import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromDiary } from '../../redux/diarySlice';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.diary.products);

  // Filter products for the selected date
  const filteredProducts = products.filter(
    product => product.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <div className={styles.container}>
      <h3>Food List for {selectedDate.toDateString()}</h3>

      {filteredProducts.length === 0 ? (
        <p className={styles.noProducts}>No products added yet.</p>
      ) : (
        <ul className={styles.list}>
          {filteredProducts.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <span>
                {item.product} - {item.weight}g
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => dispatch(removeProductFromDiary(item))}
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
