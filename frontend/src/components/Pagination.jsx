// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-6">
      <nav>
        <ul className="flex space-x-2">
          {pages.map(page => (
            <li key={page}>
              <button
                className={`px-4 py-2 rounded 
                  ${page === currentPage 
                    ? 'bg-blue-600 text-white dark:bg-blue-700 dark:text-white' 
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
