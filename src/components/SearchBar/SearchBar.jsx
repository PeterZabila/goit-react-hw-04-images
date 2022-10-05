
import React from 'react';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import pic from '../../images/search.png';
import PropTypes from 'prop-types';

export default function SearchBar({onSubmit}) {
    const [query, setQuery] = useState('');

  const handleChange = (e) => {
        const { value } = e.target;
        setQuery(value);
    }

   const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query);
        reset();
    }

   const reset = () => {
        setQuery('')
    } 

        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={handleSubmit} >
                    <button type="submit" className={styles.SearchFormButton}>
                        <img alt="" src={pic} width="25px" />
                    </button>

                    <input
                        className={styles.SearchFormInput}
                        name="query"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={handleChange}
                    />
                </form>
            </header>
        )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}