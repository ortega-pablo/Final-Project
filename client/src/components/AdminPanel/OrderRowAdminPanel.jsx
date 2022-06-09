import React from "react";

import { TableRow, TableCell, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';

const OrderRowAdminPanel = ({id, FirstName, LastName, paymentState, state}) => {
    const navigate = useNavigate();
    return ( 
            <TableRow sx={{width:"100%"}}>
                        <TableCell sx={{width:"5%"}} >
                            <ListAltIcon />
                        </TableCell>
                        
                        <TableCell sx={{width:"15%"}}>
                            <Typography variant="h5" color="ambar5.main">Orden N°: {id}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"15%"}}>
                            <Typography variant="h6" color="ambar5.main">{`${FirstName} ${LastName}`}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"15%"}}>
                            <Typography variant="h6" color="ambar5.main">Pago: {`${paymentState === 'success' ? 'Exitoso' : 'Rechazado'}`}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"20%"}}>
                            <Typography variant="h6" color="ambar5.main">Estado: {`${state === "created" ? "creada" : ''}${state === "processing" ? "en proceso" : ''}${state === "shipped" ? "enviado" : ''}${state === "cancelled" ? "cancelada" : ''}${state === "completed" ? "completada" : ''}`}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"15%"}}>
                            <Button 
                                variant='contained' 
                                color='ambar3' 
                                size='small'
                                onClick={() => {
                                    navigate(`/orderForAdminPanel/${id}`)
                                }}
                            >
                                Administrar
                            </Button>
                        </TableCell>
            </TableRow>
    );
}

export default OrderRowAdminPanel;