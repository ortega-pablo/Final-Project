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
  const validationSchema = yup.object({
    name: yup
     
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf(allCategories.map( p=> p.name), "Ya existe esa categoría" )
      .required("El nombre es requerido"),
     
     
    description: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
  });
  
  

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      await dispatch(postAddCaterory(values));
      await dispatch(getCategories());
    },
  });

  const dispatch = useDispatch();



  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      // onChange={(e) => handleInputNewCategory(e)}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        name="name"
        // helperText={leyendaErrorName2}
        // error={errorName2}
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
        // helperText={leyendaErrorDescription2}
        // error={errorDescription2}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      {/* <TextField
        id="outlined-basic"
        label="Imagen miniatura"
        variant="outlined"
        name="thumbnail"
      /> */}
      <Button type="submit">Crear nueva categoria</Button>
    </Box>
  );
};
