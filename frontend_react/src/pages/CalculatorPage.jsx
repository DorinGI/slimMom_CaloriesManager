import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyIntake } from '../redux/dailyLogSlice';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import Modal from '../components/Modal/Modal';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const { kcal, restrictedProducts, loading, error } = useSelector(
    state => state.dailyLog
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = userData => {
    dispatch(fetchDailyIntake(userData));
  };

  useEffect(() => {
    if (kcal) {
      setModalOpen(true);
    }
  }, [kcal]);

  return (
    <div className={styles.calculatorContainer}>
      {/* Left Side: Calculator */}
      <div className={styles.calculatorLeft}>
        <DailyCaloriesForm onSubmit={handleFormSubmit} />
      </div>

      {/* Right Side: RightSideBar */}
      <RightSideBar />

      {/* Modal apare când avem kcal și modalOpen este true */}
      {kcal && modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          products={restrictedProducts || []}
          kcal={kcal}
        />
      )}

      {loading && <p>Se încarcă...</p>}
      {error && <p className={styles.error}>Eroare: {error}</p>}
    </div>
  );
};

export default CalculatorPage;
