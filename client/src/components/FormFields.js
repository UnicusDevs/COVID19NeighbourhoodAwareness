import React from 'react';

export const renderInputField = ({
  input, 
  label, 
  placeholder,
  type,
  meta: { touched, error }
}) => {
  return (
    <div>
      <label> {label} </label>

      <div>
        <input 
          {...input}
          placeholder={placeholder || label}
          type={type}
        />
        {touched && error && <span> {error} </span>}
      </div>
    </div>
  );
};