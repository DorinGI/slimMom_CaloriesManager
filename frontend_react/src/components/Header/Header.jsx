import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserInfo from '../UserInfo/UserInfo';
import logo from '../../../images/logo_svg.svg';
import styles from './Header.module.css';

const Header = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="SlimMom Logo" className={styles.logo} />
        <h1 className={styles.logoText}>Slim</h1>
        <h1 className={styles.logoTextOrange}>Mom</h1>
      </div>
      <span className={styles.verticalLine}> </span>
      <nav className={styles.nav}>
        {user ? (
          <>
            <Link to="/diary" className={styles.navLink}>
              Diary
            </Link>
            <Link to="/calculator" className={styles.navLink}>
              Calculator
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        )}
      </nav>
      <div className={styles.UserInfo}>
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
