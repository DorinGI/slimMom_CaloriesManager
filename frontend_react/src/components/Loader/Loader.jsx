import React from 'react';
import { useSelector } from 'react-redux';
import { Rings } from 'react-loader-spinner';

const Loader = () => {
  const loading = useSelector(state => state.loader.loading);
  return loading ? <Rings color="#4fa94d" height={80} width={80} /> : null;
};

export default Loader;
