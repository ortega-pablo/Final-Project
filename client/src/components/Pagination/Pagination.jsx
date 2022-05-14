import React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {SelectPage} from './SelectPage';
import {SelectProductsPerPage} from './SelectProductsPerPage'

export const Paginationxd = ({setCurrentPage, currentPage, productsPerPage, products, setProductsPerPage}) => {
  
  // pagination
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const numberOfPages = Math.ceil(products/productsPerPage)

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center'}} spacing={2}>
      <Typography>Page: {currentPage}</Typography>
      <Pagination count={numberOfPages} page={currentPage} onChange={handleChangePage} siblingCount={3}/>
      <SelectPage setCurrentPage={setCurrentPage} currentPage={currentPage} productsPerPage={productsPerPage} products={products}/>
      <SelectProductsPerPage setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} setProductsPerPage={setProductsPerPage}/>
    </Stack>
  );
}
