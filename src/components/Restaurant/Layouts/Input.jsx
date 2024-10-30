// src/components/ui/Input.jsx
import React from 'react';

const Input = ({ id, name, type = "text", value = "", onChange, placeholder }) => {
  return (
    <input
    id={id}
    name={name}    
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-md p-2"
    />
  );
};

export default Input; // Exportez le composant
