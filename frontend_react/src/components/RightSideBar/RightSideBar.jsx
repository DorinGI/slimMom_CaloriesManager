import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './RightSideBar.module.css';

const RightSideBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { kcal, consumed, left, restrictedProducts } = useSelector(
    state => state.dailyLog
  );
  const validRestrictedProducts = Array.isArray(restrictedProducts)
    ? restrictedProducts
    : [];
  const filteredProducts = validRestrictedProducts.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <aside className={styles.sidebar}>
      <h3>Calories Summary </h3>
      <p>
        <strong>Left:</strong> {left} kcal
      </p>
      <p>
        <strong>Consumed:</strong> {consumed} kcal
      </p>
      <p>
        <strong>Daily Rate:</strong> {kcal} kcal
      </p>
      <p>
        <strong>% of Normal:</strong> {Math.round((consumed / kcal) * 100)}%
      </p>

      <h3>Food not recomanded</h3>
      <input
        type="text"
        placeholder="Search food ..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.restrictedList}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <li key={index}>
              <strong>{item}</strong>
            </li>
          ))
        ) : (
          <li className={styles.noResults}>No products found</li>
        )}
      </ul>
    </aside>
  );
};

export default RightSideBar;
