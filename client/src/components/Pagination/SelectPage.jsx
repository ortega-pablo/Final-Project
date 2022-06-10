import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SelectPage = ({setCurrentPage, currentPage, productsPerPage, products}) => {

  
  const handleSelectPage = (event) => {
    setCurrentPage(event.target.value);
  };

  const numbers = [];
  const numberOfPages = Math.ceil(products/productsPerPage);
  for(let i = 0 ; i < numberOfPages ; i++){
      numbers.push(i+1)
  }

  return (
    <Box sx={{ minWidth: 120,  }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="go-to-page" color="darkGrey">Pagina</InputLabel>
        <Select
          labelId="go-to-page"
          id="go-to-page"
          value={currentPage}
          label="page"
          onChange={handleSelectPage}
        >
        {
            numbers?.map(number =>(
                <MenuItem value={number}>{number}</MenuItem>
            ))
        }
        </Select>
      </FormControl>
    </Box>
  );
}
