import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyIntake } from '../redux/dailyLogSlice';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';
import styles from './HomePage.module.css';

const Home = () => {
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
    <div className={styles.homeContainer}>
      <p className={styles.description}>
        Calculează necesarul zilnic de calorii pentru un stil de viață sănătos.
      </p>

      <DailyCaloriesForm onSubmit={handleFormSubmit} />

      {loading && <Loader />}
      {error && <p className={styles.error}>Eroare: {error}</p>}

      {kcal && modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          products={restrictedProducts || []}
          kcal={kcal}
        />
      )}
    </div>
  );
};

export default Home;
