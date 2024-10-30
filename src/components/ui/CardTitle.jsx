// src/components/ui/CardTitle.jsx
import React from 'react';

const CardTitle = ({ className, children }) => {
  return (
    <h2 className={`text-lg font-bold ${className}`}>
      {children}
    </h2>
  );
};

export default CardTitle;
