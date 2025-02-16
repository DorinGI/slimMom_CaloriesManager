import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth) || {};

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.userInfo}>
      <p>Bun venit, {user.name || 'Utilizator'}!</p>
      <button onClick={handleLogout}>Deconectare</button>
    </div>
  );
};

export default UserInfo;
