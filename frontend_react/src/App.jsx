import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { fetchUser } from './redux/authSlice';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DiaryPage from './pages/DiaryPage';
import CalculatorPage from './pages/CalculatorPage';

const App = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/diary" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/diary" /> : <RegistrationPage />}
        />
        <Route
          path="/diary"
          element={user ? <DiaryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/calculator"
          element={user ? <CalculatorPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
