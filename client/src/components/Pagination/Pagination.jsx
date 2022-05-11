import React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {SelectPage} from './SelectPage';

export const Paginationxd = ({setCurrentPage, currentPage, productsPerPage, products}) => {
  
  // pagination
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const numberOfPages = Math.ceil(products/productsPerPage)

  return (
    <Stack spacing={2}>
      <Typography>Page: {currentPage}</Typography>
      <Pagination count={numberOfPages} page={currentPage} onChange={handleChangePage} />
      <SelectPage setCurrentPage={setCurrentPage} currentPage={currentPage} productsPerPage={productsPerPage} products={products}/>
    </Stack>
  );
}
