import { Box, Paper, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getAllOrdersOneUser, getUserIdByToken} from "../../../../redux/actions" 
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import OrderRow from '../OrderRow'

const MyOrders = () => {
    const dispatch = useDispatch()
    const allOrders = useSelector((state) => state.allOrderOneUser);
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  
    useEffect(() => {
      dispatch(getUserIdByToken(idToken))
      .then(response => dispatch(getAllOrdersOneUser(response)))
    }, [dispatch])

  return (
      <Box sx={{ mt: 5, width: "100%" }}>
         <Typography sx={{mt:"2%" , mb:"2%", textAlign:"center"}} variant="h3" color="darkGrey.main" >Mis ordenes</Typography>
      <TableContainer component={Paper} align="center">
        <Table aria-label="collapsible table">
            {allOrders?.map(o => (
                <OrderRow id={o.id} FirstName={o.FirstName} LastName={o.LastName} ></OrderRow>
            ))}
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MyOrders;