import { Grid, TextField } from '@mui/material';
import React from 'react';

import {useFormContext, Controller} from 'react-hook-form';





export const AddressInput = ({name, label, required}) => {
    const {control} = useFormContext();
    return (
    <Grid item xs={12} sm={6}>
        <Controller
        control={control} 
        defaultValue="" 
        name={name} 
        render={({
            field: { onChange, onBlur, value, name, ref },
        }) => (
            <TextField
                fullWidth
                label={label}
                required={required}
                onChange={onChange}
            />
        )}
        />

    </Grid>  
    );
}
 