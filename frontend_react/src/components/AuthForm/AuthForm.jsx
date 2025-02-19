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
        <label>
          Nume:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={showNameField}
          />
        </label>
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
      <label>
        Parola:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
