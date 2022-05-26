import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import { AddressInput } from './AddressInput';
import { setShippingData } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const AdressForm =  ({nexStep, backStep}) => {
    const dispatch = useDispatch();
    const methods = useForm();
    return (
        <>
            <Typography>
                Direccion de envio
            </Typography>
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(data => {
                    dispatch(setShippingData(data));
                    nexStep();
                })}>
                    <Grid container spacing={3}>
                        <AddressInput
                         required 
                         name="FirstName" 
                         label="Nombre" 
                         />
                        <AddressInput
                         required 
                         name="LastName" 
                         label="Apellido" 
                         />
                        <AddressInput
                         required 
                         name="Address1" 
                         label="Dirección" 
                         />
                        <AddressInput
                         required 
                         name="EmailAddress" 
                         label="Dirección de email" 
                         />
                        <AddressInput
                         required 
                         name="City" 
                         label="Ciudad" 
                         />
                        <AddressInput
                         required 
                         name="PostCode" 
                         label="Código postal" 
                         />
                    </Grid>
                    <Box component='div' sx={{display:"flex", justifyContent:"space-between", mt:"1rem"}}>
                    <Button variant='contained' sx={{color: "black"}}>
                        Back
                    </Button>
                    <Button type='submit' variant='contained' sx={{color: "black"}}>
                        Next
                    </Button>
                    </Box>
                </Box>
            </FormProvider>
        </>
    );
}
 
