// src/components/Restaurant/Layouts/Button.jsx
import React from 'react';

const Button = ({ onClick, children, loading, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md p-2 text-sm border border-black 
        dark:border-yellow-500 dark:text-white shadow-sm 
        transition-all duration-150 
        hover:bg-black hover:border-white 
        hover:dark:border-white hover:text-white
        ${loading ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span>Loading...</span> // You can replace this with a spinner component if desired
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
