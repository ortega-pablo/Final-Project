import React from "react";

import { TableRow, TableCell, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';

const OrderRow = ({id, FirstName, LastName, createdAt}) => {
    const navigate = useNavigate();
    return ( 
            <TableRow sx={{width:"100%"}}>
                        <TableCell sx={{width:"10%"}} >
                            <ListAltIcon />
                        </TableCell>
                        
                        <TableCell sx={{width:"30%"}}>
                            <Typography variant="h5" color="ambar5.main">Orden N°: {id}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"40%"}}>
                            <Typography variant="h6" color="ambar5.main">{`${FirstName} ${LastName}`}</Typography>
                        </TableCell>
                        <TableCell sx={{width:"30%"}}>
                            <Button 
                                variant='contained' 
                                color='ambar3' 
                                size='small'
                                onClick={() => {
                                    navigate(`/orderForUserPanel/${id}`)
                                }}
                            >
                                Ver detalles
                            </Button>
                        </TableCell>
            </TableRow>
    );
}

export default OrderRow;