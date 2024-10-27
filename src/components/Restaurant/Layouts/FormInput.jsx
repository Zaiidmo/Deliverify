// src/components/ui/FormInput.jsx
import React from 'react';
import Label  from './Label';
import Input from './Input';

const FormInput = ({ label,name, id, type = 'text', placeholder, value, onChange}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
         id={id}
         name={name}
        type={type}
        placeholder={placeholder}
        value={value}      
        onChange={onChange}  
        className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
      />
    </div>
  );
};

export default FormInput;
