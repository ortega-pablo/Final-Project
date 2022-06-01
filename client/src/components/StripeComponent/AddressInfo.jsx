import { ImageListItem, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {useSelector} from 'react-redux'


export const AddressInfo = () => {
    const shippingData = useSelector(state => state.shippingData);
    console.log(shippingData)
    return (
        <Box>
            <Typography variant='h6'>
                Datos comprador:
            </Typography>
            <List disablePadding>
            <ListItem disablePadding >
                    <ListItemText
                        sx={{pr:"16px", pl:"16px"}}
                        disablePadding
                        primary={`Nombre completo: ${shippingData.FirstName} ${shippingData.LastName}.`}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{pr:"16px", pl:"16px"}}
                        disablePadding
                        primary={`Direccion: ${shippingData.Address1}, ${shippingData.City}, ${shippingData.Country}.`}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{pr:"16px", pl:"16px"}}
                        disablePadding
                        primary={`CP: ${shippingData.PostCode}.`}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{pr:"16px", pl:"16px"}}
                        disablePadding
                        primary={`Número de teléfono: ${shippingData.Mobile}.`}
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemText
                        sx={{pr:"16px", pl:"16px"}}
                        disablePadding
                        primary={`Correo electrónico: ${shippingData.EmailAddress}.`}
                    />
                </ListItem>
            </List>
             
        </Box>
    );
}
 