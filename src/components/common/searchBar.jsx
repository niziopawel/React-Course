import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className='input-group mb-3'>
      <input
        type='text'
        name='query'
        className='form-control my-3'
        placeholder='Search...'
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBar;
