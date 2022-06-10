import React from "react";

import { TableRow, TableCell, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { TypographyMenu } from "../../personalizadTheme";

const OrderRowAdminPanel = ({id, FirstName, LastName, paymentState, state}) => {
    const navigate = useNavigate();
    return ( 
            <TableRow sx={{width:"100%"}}>
                        <TableCell sx={{width:"5%"}} >
                            <ListAltIcon />
                        </TableCell>
                        
                        <TableCell sx={{width:"15%"}}>
                            <Typography variant="h5" >Orden N°: {id}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"15%"}}>
                            <Typography variant="h6" >{`${FirstName} ${LastName}`}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"15%"}}>
                            <Typography variant="h6" >Pago: {`${paymentState === 'success' ? 'Exitoso' : 'Rechazado'}`}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"20%"}}>
                            <Typography variant="h6" >Estado: {`${state === "created" ? "creada" : ''}${state === "processing" ? "en proceso" : ''}${state === "shipped" ? "enviado" : ''}${state === "cancelled" ? "cancelada" : ''}${state === "completed" ? "completada" : ''}`}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"15%"}}>
                            <Button 
                                variant='contained' 
                                color='darkGrey' 
                                size='small'
                                onClick={() => {
                                    navigate(`/orderForAdminPanel/${id}`)
                                }}
                            >
                               <TypographyMenu>Administrar</TypographyMenu> 
                            </Button>
                        </TableCell>
            </TableRow>
    );
}

export default OrderRowAdminPanel;