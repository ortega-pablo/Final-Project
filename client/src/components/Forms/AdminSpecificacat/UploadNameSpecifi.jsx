import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from '@mui/system';
import { Button, Paper, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getAllSpecifications, putNameSpecification } from '../../../redux/actions';
import { TypographyMenu } from '../../../personalizadTheme';

export const UploadNameSpecifi = ({uploading,idSpecif, setUploading, allSpecication }) => {
const dispatch = useDispatch()
const specifiForUpload = allSpecication?.find( s => s.id = idSpecif)


const nameRepetido = allSpecication.filter( s => s.id !==idSpecif )
const NameRepetido = nameRepetido.map((s) => s.name);
console.log(NameRepetido)
    const validationSchema = yup.object({
        name: yup
        .string("El valor es necesario")
        .notOneOf( nameRepetido.map((s) => s.name)  ,"Ya existe esta especificacíon")
        .required("El valor es requerido "),
        
        
      });
    
    
    
      const formik = useFormik({
        initialValues: {
            name: specifiForUpload?.name,
            id: idSpecif
        
        },
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm}) => {
          // alert(JSON.stringify(values, null, 2));
          await dispatch(putNameSpecification( idSpecif ,values))
          await dispatch(getAllSpecifications())   
          setUploading(false)
        },
      });


  return (

<Paper sx={{mb:3}}>

     <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        sx={{p:2, display:"flex", justifyContent:"space-between"}}
      >
        <TextField
          id="outlined-basic"
          label="Nuevo nombre"
          variant="outlined"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}

        />
        {/* <h3>Stock actual: {newProduct?.productInventory?.quantity} </h3>
        <h3>Stock a modificar: {formik.values.quantity} </h3> */}
        <Button type="submit" variant="contained" color="darkGrey" size="small"> <TypographyMenu>Modificar</TypographyMenu> </Button>
       <Button onClick={()=>setUploading(false)} type="click" variant="contained" color="darkGrey" size="small"><TypographyMenu>Cancelar</TypographyMenu></Button>

      </Box>
</Paper>


    
  )
}
