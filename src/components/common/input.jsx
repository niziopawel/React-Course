import React from 'react';

const Input = ({ name, label, error, focus, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        autoFocus={focus ? true : false}
        className='form-control'
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
