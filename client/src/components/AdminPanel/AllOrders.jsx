import { Box, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../redux/actions';
import OrderRowAdminPanel from './OrderRowAdminPanel';

const AllOrders = () => {
    const dispatch = useDispatch()
    const allOrders = useSelector((state) => state.allOrders);
  
    useEffect(() => {
      dispatch(getAllOrders());
    }, [dispatch])

  return (
      <Box sx={{ mt: 5, width: "100%" }}>
         <Typography sx={{mt:"2%" , mb:"2%", textAlign:"center"}} variant="h3" color="ambar5.main" >Todas las ordenes</Typography>
      <TableContainer component={Paper} align="center">
        <Table aria-label="collapsible table">
            {allOrders?.map(o => (
                <OrderRowAdminPanel state={o.state} paymentState={o.paymentState} id={o.id} FirstName={o.FirstName} LastName={o.LastName} ></OrderRowAdminPanel>
            ))}
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AllOrders;