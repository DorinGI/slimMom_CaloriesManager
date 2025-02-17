import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import styles from './DiaryDateCalendar.module.css';

const DiaryDateCalendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(date);
    onSelectDate(date);
    setShowCalendar(false);
  };

  return (
    <div className={styles.calendarContainer}>
      <span className={styles.selectedDate}>
        {selectedDate.toLocaleDateString('en-GB')}
      </span>

      <button
        className={styles.calendarButton}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <FaCalendarAlt />
      </button>

      {showCalendar && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
      )}
    </div>
  );
};

export default DiaryDateCalendar;
