import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Email invalid').required('Obligatoriu'),
        password: Yup.string()
          .min(6, 'Minim 6 caractere')
          .required('Obligatoriu'),
      })}
      onSubmit={values => {
        dispatch(loginUser(values));
      }}
    >
      <Form>
        <Field type="email" name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />

        <Field type="password" name="password" placeholder="Parolă" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
