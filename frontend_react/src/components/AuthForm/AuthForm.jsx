import React, { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = ({ onSubmit, buttonText, showNameField }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {showNameField && (
        <>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={showNameField}
            />
          </label>
          <div className={styles.underline}></div>
        </>
      )}

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <div className={styles.underline}></div>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className={styles.underline}></div>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
