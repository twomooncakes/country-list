import React from 'react';
import Button from './Button';
import css from './Pagination.module.css';

interface Props {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate(currentPage: number): void;
}

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }: Props) => {
  return (
    <div className={css["pagination-container"]}>
      {currentPage > 1 && <Button onClick={() => paginate(currentPage - 1)}>{`< Previous Page`}</Button>}
      {currentPage < (Math.ceil(totalItems / itemsPerPage)) && <Button onClick={() => paginate(currentPage + 1)}>{`Next Page >`}</Button>}
    </div>
  )
}

export default Pagination;