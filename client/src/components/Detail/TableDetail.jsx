import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Version', 1590, "algoritmo", 45),
  createData('Algoritmo', 2373),
  createData('Hashrate', 262.0),
  createData('Power', 3053),
  createData('Tamaño', 356.9),
  createData('Peso', 356.9)
];

export default function TableDetail({products}) {




  return (
    <TableContainer component={Paper}>
        <h3>Especificaciones técnicas</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {/* <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {<>
            <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
               Nombre
              </TableCell>
              <TableCell component="th" scope="row">
               {products[0].name}
              </TableCell>
            
            </TableRow>
          
          </>
         }
         {<>
            <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
               Tamaño
              </TableCell>
              <TableCell component="th" scope="row">
               {products[0].productDimension}
              </TableCell>
             
            </TableRow>
          
          </>
         }
          {<>
            <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
               Codigo
              </TableCell>
              <TableCell component="th" scope="row">
               {products[0].sku}
              </TableCell>
             
            </TableRow>
          
          </>
         }
            {<>
            <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
               Peso
              </TableCell>
              <TableCell component="th" scope="row">
               {products[0].netWeight}
              </TableCell>
             
            </TableRow>
          
          </>
         }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
