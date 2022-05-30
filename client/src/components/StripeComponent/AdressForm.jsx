import { Box, Button, Collapse, FormControl, Grid, Typography, FormLabel, Divider, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import { AddressInput } from './AddressInput';
import { getUserIdByToken, setShippingData, postNewDirection, getAllDirections} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const AdressForm =   ({nexStep, backStep}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const methods = useForm();
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const directions = useSelector(state => state.allDirections);
    const [currentDirection, setCurrentDirection] = useState(0);
    const [direction, setDirecion] = useState(null);

    useEffect( () => {
        dispatch(getUserIdByToken(idToken))
        .then(r => dispatch(getAllDirections(r)))
    }, [dispatch])
    // const directions = 
    return (
        <>
            <Typography>
                Direccion de envio
            </Typography>
            <FormControl>
                <FormLabel >Direcciones</FormLabel>
                <RadioGroup 
                onChange={async (e)=> {
                    setCurrentDirection(e.target.value);
                }}  
                value={currentDirection} >
                    {directions?.map(d => (
                        <FormControlLabel value={d.id2} control={<Radio></Radio>} label={`${d.Country}, ${d.Address1}, ${d.City} - ${d.FirstName} ${d.LastName}`} />
                    ))}
                </RadioGroup>
            </FormControl>
            <Divider></Divider>
            <Button onClick={() => setOpen(!open)} >Nueva dirección</Button>
            <Collapse in={open}>
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(async data => {
                    const userId = await dispatch(getUserIdByToken(idToken));
                    await dispatch(setShippingData(data));
                    await dispatch(postNewDirection(userId, data))
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
                         name="Country" 
                         label="Pais" 
                         />
                        <AddressInput
                         required 
                         name="Address1" 
                         label="Dirección" 
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
                        <AddressInput
                         required 
                         name="EmailAddress" 
                         label="Dirección de email" 
                         />
                        <AddressInput
                         required 
                         name="Mobile" 
                         label="Número de teléfono" 
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
            </Collapse>
           {!open && <Box component="form" onSubmit={async (e) => {
               e.preventDefault()
               console.log(directions)
               console.log(currentDirection)
               let direction = directions[currentDirection];
               await dispatch(setShippingData(direction));
               nexStep()
           }}>
                            <Box component='div' sx={{display:"flex", justifyContent:"space-between", mt:"1rem"}}>
                                <Button variant='contained' sx={{color: "black"}}>
                                    Back
                                </Button>
                                <Button type='submit' variant='contained' sx={{color: "black"}}>
                                    Next
                                </Button>
                            </Box>
                    </Box> 
            }

        </>
    );
}
 
