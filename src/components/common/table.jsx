import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ onSort, columns, sortColumn, data }) => {
  return (
    <table className='table'>
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
