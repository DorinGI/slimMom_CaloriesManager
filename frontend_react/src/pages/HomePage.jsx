import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyIntake } from '../redux/dailyLogSlice';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';
import styles from './HomePage.module.css';
import Banana from '../../images/Banana.png';
import Strawberry from '../../images/Strawberry.png';
import Leaf from '../../images/Leaf.png';

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
      <div className={styles.formContainer}>
        <p className={styles.description}>
          Calculate your daily calorie intake right now
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
      <div className={styles.graphics}>
        <img src={Banana} alt="Banana" className={styles.banana} />
        <img src={Strawberry} alt="Strawberry" className={styles.strawberry} />
        <img src={Leaf} alt="Leaf" className={styles.leaf} />

        {/* SVG în colțul dreapta jos */}
        <svg
          className={styles.svgShape}
          width="603"
          height="816"
          viewBox="0 0 603 816"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M206 259C51.6 271.8 6 403.667 1.5 468C-8.1 648.4 119.167 775.167 185 816H603V-0.000244141C603 -0.000244141 574.5 24.4998 570 68.9997C533 262 534.5 291 467.5 300.5C400.5 310 316 249.881 206 259Z"
            fill="#F0F1F3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
