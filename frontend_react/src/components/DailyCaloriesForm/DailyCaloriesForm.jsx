import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDailyIntake } from '../../redux/dailyLogSlice';
import styles from './DailyCaloriesForm.module.css';

const DailyCaloriesForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    height: '',
    desiredWeight: '',
    age: '',
    currentWeight: '',
    bloodType: '1',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(fetchDailyIntake(formData));
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.inputRow}>
        <label>
          Height
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
          <div className={styles.underline}></div>
        </label>
        <label>
          Desired weight
          <input
            type="text"
            name="desiredWeight"
            value={formData.desiredWeight}
            onChange={handleChange}
            required
          />
          <div className={styles.underline}></div>
        </label>
      </div>

      <div className={styles.inputRow}>
        <label>
          Age
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <div className={styles.underline}></div>
        </label>
        <label>
          Current weight
          <input
            type="text"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            required
          />
          <div className={styles.underline}></div>
        </label>
      </div>

      <div className={styles.bloodTypeContainer}>
        <span>Blood type</span>
        <div className={styles.radioGroup}>
          {[1, 2, 3, 4].map(type => (
            <label key={type}>
              <input
                type="radio"
                name="bloodType"
                value={type}
                checked={formData.bloodType === `${type}`}
                onChange={handleChange}
                required
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Start Losing Weight
      </button>
    </form>
  );
};

export default DailyCaloriesForm;
