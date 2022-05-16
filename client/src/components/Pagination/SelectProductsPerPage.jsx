import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SelectProductsPerPage = ({setProductsPerPage, productsPerPage, setCurrentPage}) => {
    const handleSelectProductsPerPage = (event) => {
        setProductsPerPage(event.target.value);
        setCurrentPage(1)
    };



    return (
    <Box sx={{ minWidth: 120,  }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="products-per-page">Productos</InputLabel>
            <Select
                labelId="products-per-page"
                id="products-per-page"
                value={productsPerPage}
                label="page"
                onChange={handleSelectProductsPerPage}
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>
        </FormControl>
    </Box>
  )
}
