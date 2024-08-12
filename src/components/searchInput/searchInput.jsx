import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import './searchInput.css'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search within this category"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa fa-search"></i> {}
      </button>
    </form>
  );
};

export default SearchBar;
