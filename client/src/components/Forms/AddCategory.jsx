import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { postAddCaterory, getCategories, getDetailOneProduct } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';

export const AddCategory = ({ allCategories }) => {
  const dispatch = useDispatch();
const [creating, setCreating] = useState(false)


  const validationSchema = yup.object({
    name: yup
     
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf(allCategories.map( p=> p.name), "Ya existe esa categoría" )
      .max(50, "La cantidad máxima de caracteres para una categoráa es 50")
      .required("El nombre es requerido"),
     
     
    description: yup
      .string("Ingrese la descripción")
      .max(100, "La cantidad máxima de caracteres es 100")

      .required("La descripción es requerida"),
  });
  
  

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values ,{resetForm}) => {
      Swal.fire({
        background: '#DFDCD3',
        icon: 'success',
        title: 'Creada',
        showConfirmButton: false,        
        timer: 1500
      })
      await dispatch(postAddCaterory(values));
      await dispatch(getCategories());
    //  setCreating(true)
      resetForm({values:""})
      
    },
  });




  return (
    <>
    
    
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{m:3}}
      />
      <TextField
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        sx={{m:3}}
      />
   
      <Button type="submit" sx={{m:3}} variant='contained' color="ambar3">Crear nueva categoria</Button>
{/* { formik.values  &&

  <Button type="click" onClick={e=> formik.resetForm({values:""})} sx={{m:3}} variant='contained' color="ambar3">Cancelar creación</Button>
} */}
    </Box>

    </>
  );
};
