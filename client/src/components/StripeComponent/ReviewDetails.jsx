import { ImageListItem, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {useSelector} from 'react-redux'


export const ReviewDetails = () => {
    const cart = useSelector(state => state.cart);
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
                            src={"data:image/jpeg;base64,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"}
                            />
                        </ImageListItem>
                        <ListItemText
                            sx={{margin:"5px"}}
                            primary={p.name}
                            secondary={"x" + p.Quantity.total}
                        />
                        <ListItemText
                            sx={{margin:"5px", border:"2px solid black"}}
                            primary={`Sub total: $${dollarUSLocale.format(p.price * p.Quantity.total)}`}
                        />
                        {/* <Typography variant='body2'>
                            {`Sub total: $${dollarUSLocale.format(p.price * p.Quantity.total)}`}
                        </Typography> */}
                    </ListItem>
                ))}
                <ListItem>
                {/* <ListItemText
                            sx={{margin:"5px"}}
                            primary={`Total:$${dollarUSLocale.format(cart.amount/100)}`}
                        /> */}
                        <Typography variant='subtitle1'>
                            {`Total: $${dollarUSLocale.format(cart.amount/100)}`}
                        </Typography>
                </ListItem>
            </List>
             
        </Box>
    );
}
 
