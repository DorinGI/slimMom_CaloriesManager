import React from 'react';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyCaloriesForm';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  return (
    <div className={styles.calculatorContainer}>
      {/* Left Side: Calculator */}
      <div className={styles.calculatorLeft}>
        <DailyCaloriesForm />
      </div>

      {/* Right Side: RightSideBar */}
      <RightSideBar />
    </div>
  );
};

export default CalculatorPage;
