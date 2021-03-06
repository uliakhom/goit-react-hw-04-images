import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './searchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const handleChange = event => {
    setQ(event.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ q });
    setQ('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          value={q}
          onChange={handleChange}
          type="text"
          name="q"
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
