import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import AuthForm from '../components/AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleRegister = async userData => {
    const result = await dispatch(registerUser(userData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/diary');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      {error && <p className={styles.error}>{error.message}</p>}
      <AuthForm
        onSubmit={handleRegister}
        buttonText="Register"
        showNameField={true}
      />
      {loading && <p>Loading...</p>}
      <p>
        You already have an Account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default RegisterPage;
