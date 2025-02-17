import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RightSideBar.module.css';

const RightSideBar = ({ selectedDate }) => {
  const { kcal, consumed, left, restrictedProducts } = useSelector(
    state => state.dailyLog
  );

  return (
    <aside className={styles.sidebar}>
      <h3>Calorie Summary</h3>
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

      <h3>Restricted Foods</h3>
      <ul>
        {restrictedProducts.slice(0, 5).map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </aside>
  );
};

export default RightSideBar;
