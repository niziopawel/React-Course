import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  if (itemsCount === 0) return null;
  const pages = Array(Math.ceil(itemsCount / pageSize))
    .fill()
    .map((v, k) => (v = k + 1));

  if (pages.length === 1) return null;

  return (
    <nav>
      <ul className='pagination'>
        {pages.map(number => {
          return (
            <li
              className={
                number === currentPage ? 'page-item active' : 'page-item'
              }
              key={number}
            >
              <button
                className='page-link'
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
