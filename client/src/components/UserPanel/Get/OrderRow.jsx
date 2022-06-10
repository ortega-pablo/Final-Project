import React from "react";

import { TableRow, TableCell, Typography, Button, ListItemIcon } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { TypographyMenu } from "../../../personalizadTheme";

const OrderRow = ({id, FirstName, LastName, createdAt}) => {
    const navigate = useNavigate();
    return ( 
            <TableRow sx={{width:"100%"}}>
                        <TableCell sx={{width:"10%"}} >
                            <ListItemIcon>
                            <ListAltIcon />
                            </ListItemIcon>
                            
                        </TableCell>
                        
                        <TableCell sx={{width:"30%"}}>
                            <Typography variant="h5" >Orden N°: {id}</Typography>
                        </TableCell>

                        <TableCell sx={{width:"40%"}}>
                            <Typography variant="h6" >{`${FirstName} ${LastName}`}</Typography>
                        </TableCell>
                        <TableCell sx={{width:"30%"}}>
                            <Button 
                                variant='contained' 
                                color='darkGrey' 
                                size='small'
                                onClick={() => {
                                    navigate(`/orderForUserPanel/${id}`)
                                }}
                            >
                                <TypographyMenu>Ver detalles</TypographyMenu>
                            </Button>
                        </TableCell>
            </TableRow>
    );
}

export default OrderRow;