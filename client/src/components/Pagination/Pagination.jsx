import React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {SelectPage} from './SelectPage';

export const Paginationxd = ({setCurrentPage, currentPage, productsPerPage, products, setProductsPerPage}) => {
  
  // pagination
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const numberOfPages = Math.ceil(products/productsPerPage)

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center'}} spacing={2}>
      <Typography variant="h6" color="text.primary" >Pagina: {currentPage} de {numberOfPages}</Typography>
      <Pagination count={numberOfPages} page={currentPage} onChange={handleChangePage} siblingCount={3} color='ambar2'/>
      <SelectPage setCurrentPage={setCurrentPage} currentPage={currentPage} productsPerPage={productsPerPage} products={products}/>
    </Stack>
  );
}
