import { Box, Button, Collapse, FormControl, Grid, Typography, FormLabel, Divider, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import { AddressInput } from './AddressInput';
import { getUserIdByToken, setShippingData, postNewDirection, getAllDirections} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from 'react-router-dom';

export const AdressForm =   ({nexStep, backStep}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const methods = useForm();
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const directions = useSelector(state => state.allDirections);
    const [currentDirection, setCurrentDirection] = useState(0);
    const [direction, setDirecion] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        dispatch(getUserIdByToken(idToken))
        .then(r => dispatch(getAllDirections(r)))
    }, [dispatch])
    // const directions = 
    return (
        <Box sx={{display:"flex", flexDirection:"column", minHeight: "100%"}}>
            <Typography variant='h6'>
                Direccion de envio
            </Typography>
            {directions ? 
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
            </FormControl> : <></>} 
            <Divider></Divider>
            <Box>
            <Button  color='ambar3' size='small' onClick={() => setOpen(!open)} sx={{mt: 2}}  endIcon={open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>} >{open ? "Cancelar" : "Nueva dirección"  }</Button>
            {/* {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>} */}
            </Box>
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
                    <Button 
                    variant='contained' 
                    color='ambar3' 
                    size='small'
                    onClick={() => navigate('/cart')}
                    >
                        Volver al carrito
                    </Button>
                    <Button type='submit' variant='contained' color='ambar3' size='small'>
                        Siguiente
                    </Button>
                    </Box>
                </Box>
            </FormProvider>
            </Collapse>
           {!open && <Box sx={{display:"flex", flexDirecion:"column", justifyContent: "center"}} component="form" onSubmit={async (e) => {
               e.preventDefault()
               let direction = directions[currentDirection];
               await dispatch(setShippingData(direction));
               nexStep()
           }}>
                            <Box component='div' sx={{display:"flex", justifyContent:"space-between", mt:"1rem", width:"100%", bottom: 0}}>
                                <Button 
                                variant='contained' 
                                color='ambar3' 
                                size='small'
                                onClick={() => navigate('/cart')}
                                >
                                    Volver al carrito
                                </Button>
                                <Button disabled={!directions.length} type='submit' variant='contained' color='ambar3' size='small'>
                                    Siguiente
                                </Button>
                            </Box>
                    </Box> 
            }

        </Box>
    );
}
 
