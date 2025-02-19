import React, { useEffect, useState } from 'react';
import DiaryDateCalendar from '../components/DiaryDateCalendar/DiaryDateCalendar';
import DiaryAddProductForm from '../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import { useDispatch } from 'react-redux';
import { fetchDailyLog } from '../redux/dailyLogSlice';
import styles from './DiaryPage.module.css';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    dispatch(fetchDailyLog(dateString));
  }, [selectedDate, dispatch]);

  return (
    <div className={styles.diaryContainer}>
      {/* Left side: Diary */}
      <div className={styles.diaryLeft}>
        <DiaryDateCalendar onSelectDate={setSelectedDate} />
        <DiaryAddProductForm selectedDate={selectedDate} />
        <DiaryProductsList selectedDate={selectedDate} />
      </div>

      {/* Right side: RightSideBar */}
      <RightSideBar selectedDate={selectedDate} />
    </div>
  );
};

export default DiaryPage;
