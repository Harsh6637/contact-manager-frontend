import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, searchContacts }) => {
  return (
    <div className="search-contacts-container">
      <input
        type="text"
        placeholder="Search Contacts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={searchContacts}>Search</button>
    </div>
  );
};

export default SearchBar;
