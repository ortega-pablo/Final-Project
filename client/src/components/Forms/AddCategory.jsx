import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";
import { validateNewCat } from "./validacionInputNewCategoria/validateNewCat";
import { postAddCaterory, getCategories } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

export const AddCategory = ({ allCategories }) => {
  const dispatch = useDispatch();
const [creating, setCreating] = useState(false)


  const validationSchema = yup.object({
    name: yup
     
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf(allCategories.map( p=> p.name), "Ya existe esa categoría" )
      .required("El nombre es requerido"),
     
     
    description: yup
      .string("Ingrese la descripción")
      .required("La descripción es requerida"),
  });
  
  

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values ,{resetForm}) => {
      alert(JSON.stringify(values, null, 2));
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
      />
   
      <Button type="submit">Crear nueva categoria</Button>
    </Box>
{ formik.values  &&

  <Button type="click" onClick={e=> formik.resetForm({values:""})}>Cancelar creación</Button>
}

    </>
  );
};
