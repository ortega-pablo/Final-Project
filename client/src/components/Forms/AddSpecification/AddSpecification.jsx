import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecifications,  postAddNewSpecification } from "../../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";


export const AddSpecification = () => {
  const dispatch = useDispatch();
  const allSpecifications = useSelector( state => state.allSpecifications)
  
  useEffect(()=>{
    dispatch(getAllSpecifications())
  }, [dispatch])
  
  
  const allSpecif = allSpecifications?.map((s) => s.name);


  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .required("El nombre es requerido")
      .notOneOf(allSpecif.map((p) => p) ,"Ya existe una especificación con ese nombre"
      ),

    
  });

  const formik = useFormik({
    initialValues: {
      name: "",
       },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      alert(JSON.stringify(values, null, 1));

      await dispatch(postAddNewSpecification(values));
      await dispatch(getAllSpecifications())
      resetForm({values:""})
    },
  });
  

  return (
    <>




      <div>AddSpecification</div>
      <InputLabel id="demo-simple-select-standard-label">
        Agregar especicación:
      </InputLabel>

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

        <Button type="submit">
          Agregar nueva Especificación
        </Button>
      </Box>

      
    </>
  );
};
