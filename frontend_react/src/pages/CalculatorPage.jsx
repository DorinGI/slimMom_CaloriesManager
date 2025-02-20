import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyIntakeUser } from '../redux/dailyLogSlice';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyIntakeUser());
  }, [dispatch]);

  const handleFormSubmit = userData => {
    dispatch(fetchDailyIntakeUser(userData));
  };
  const {
    kcal,
    restrictedProducts,
    loading = false,
    error,
  } = useSelector(state => state.dailyLog || {});
  // console.log('Home Kcal', kcal);
  // console.log('HomeRestricted', restrictedProducts);
  return (
    <div className={styles.calculatorContainer}>
      {/* Left Side: Calculator */}
      <div className={styles.calculatorLeft}>
        <DailyCaloriesForm onSubmit={handleFormSubmit} />
      </div>

      {/* Right Side: RightSideBar */}
      <RightSideBar />

      {loading && <p>Se încarcă...</p>}
      {error && <p className={styles.error}>Eroare: {error}</p>}
    </div>
  );
};

export default CalculatorPage;
