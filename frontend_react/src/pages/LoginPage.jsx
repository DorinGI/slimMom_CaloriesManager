import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import AuthForm from '../components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleLogin = async userData => {
    const result = await dispatch(loginUser(userData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/diary');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Autentificare</h1>
      {error && <p className={styles.error}>{error.message}</p>}
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
      {loading && <p>Se încarcă...</p>}
      <p>
        Nu ai cont? <a href="/register">Înregistrează-te</a>
      </p>
    </div>
  );
};

export default LoginPage;
