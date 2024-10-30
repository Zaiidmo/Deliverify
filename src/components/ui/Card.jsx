// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ className, children }) => {
  return (
    <div className={`border rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
