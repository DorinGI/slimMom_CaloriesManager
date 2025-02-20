import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DiaryDateCalendar from '../components/DiaryDateCalendar/DiaryDateCalendar';
import DiaryAddProductForm from '../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../components/DiaryProductsList/DiaryProductsList';
import RightSideBar from '../components/RightSideBar/RightSideBar';
import { fetchDailyLog } from '../redux/dailyLogSlice';
import { fetchDailyIntakeUser } from '../redux/dailyLogSlice';
import styles from './DiaryPage.module.css';

const DiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDailyIntakeUser());
  }, [dispatch]);

  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    dispatch(fetchDailyLog(dateString));
  }, [selectedDate, dispatch, refresh]);

  return (
    <div className={styles.diaryContainer}>
      {/* Left side: Diary */}
      <div className={styles.diaryLeft}>
        <DiaryDateCalendar onSelectDate={setSelectedDate} />
        <DiaryAddProductForm
          selectedDate={selectedDate}
          onRefresh={() => setRefresh(prev => !prev)}
        />
        <DiaryProductsList
          selectedDate={selectedDate}
          onRefresh={() => setRefresh(prev => !prev)}
        />
      </div>

      {/* Right side: RightSideBar */}
      <RightSideBar />
    </div>
  );
};

export default DiaryPage;
