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
  // console.log(user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.userInfo}>
      <p>{user.name || 'Utilizator'}</p>
      <span className={styles.verticalLine}></span>
      <button onClick={handleLogout}>Exit</button>
    </div>
  );
};

export default UserInfo;
