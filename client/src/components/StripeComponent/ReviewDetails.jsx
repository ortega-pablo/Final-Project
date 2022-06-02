import { ImageListItem, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getCartById } from '../../redux/actions';


export const ReviewDetails = () => {
    const dispatch = useDispatch()
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const cart = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(getCartById(idToken))
    },[dispatch])
    let dollarUSLocale = Intl.NumberFormat('en-US');
    return (
        <Box>
            <Typography variant='h6'>
                Resumen de compra:
            </Typography>
            <List disablePadding>
                {cart?.products?.map(p =>( 
                    <ListItem key={p.name} sx={{display:"flex", justifyContent: "space-around"}}>
                        <ImageListItem sx={{width: "90px", heigth: "90px"}}>
                            <img 
                            src={p.images[0]?.urlFile} alt="hola"
                            />
                        </ImageListItem>
                        <ListItemText
                            sx={{margin:"5px"}}
                            primary={p.name}
                            secondary={"x" + p.Quantity.total}
                        />
                        <ListItemText
                            sx={{margin:"5px"}}
                            primary={`Sub total: $${dollarUSLocale.format(p.price * p.Quantity.total)}`}
                        />
                        {/* <Typography variant='body2'>
                            {`Sub total: $${dollarUSLocale.format(p.price * p.Quantity.total)}`}
                        </Typography> */}
                    </ListItem>
                ))}
                <ListItem>
                        <Typography variant='subtitle2'>
                            {`Total: $${dollarUSLocale.format(cart.amount/100)}`}
                        </Typography>
                </ListItem>
            </List>
             
        </Box>
    );
}
 
