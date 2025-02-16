import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';

const Modal = ({ onClose, products, kcal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        <h2>Your recommended daily calorie intake is</h2>
        <p>{kcal}</p>

        <input
          type="text"
          placeholder="Search a product ..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <h3>Foods you should not eat:</h3>
        <ul className={styles.productList}>
          {filteredProducts.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> - {item.categories} ({item.calories}{' '}
              kcal)
            </li>
          ))}
        </ul>

        <button className={styles.loadMore} onClick={() => navigate('/login')}>
          Start losing weight
        </button>
      </div>
    </div>
  );
};

export default Modal;
