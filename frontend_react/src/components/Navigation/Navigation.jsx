import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/diary">Diary</Link>
      <Link to="/calculator">Calculator</Link>
    </nav>
  );
};

export default Navigation;
