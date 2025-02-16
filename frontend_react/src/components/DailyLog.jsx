import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDailyLog,
  addProduct,
  removeProduct,
} from '../redux/slices/dailyLogSlice';

const DailyLog = () => {
  const dispatch = useDispatch();
  const { log, loading, error } = useSelector(state => state.dailyLog);

  useEffect(() => {
    dispatch(fetchDailyLog('2024-02-09')); // Fetch log pentru o dată specifică
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(
      addProduct({ date: '2024-02-09', product: 'Apple', calories: 95 })
    );
  };

  const handleRemoveProduct = id => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2>Jurnalul Zilnic</h2>
      {loading && <p>Se încarcă...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {log.map(item => (
          <li key={item.id}>
            {item.name} - {item.calories} kcal
            <button onClick={() => handleRemoveProduct(item.id)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddProduct}>Adaugă Măr 🍏</button>
    </div>
  );
};

export default DailyLog;
