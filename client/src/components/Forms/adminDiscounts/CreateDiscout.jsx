import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscount, postDiscount } from "../../../redux/actions";
import Swal from 'sweetalert2';
import { TypographyMenu } from "../../../personalizadTheme";
export const CreateDiscout = () => {
  const dispatch = useDispatch();
  const allDiscounts = useSelector((state) => state.discounts)
  useEffect(()=>{
    dispatch(getAllDiscount())
  },[dispatch])



  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf( allDiscounts?.map( d=> d.name)  ,"Ya existe un descuento con este nombre")
      .required("El nombre es requerido"),

    description: yup
        .string("Ingrese el nombre de la nueva categoria"),

    discountPercent: yup
        .number("Ingrese el nombre de la nueva categoria").typeError("El descuento debe ser numerico  entre 1 y 100")
        .min(1, "El valor posible es entre 1 y 100")
        .max(100, "El valor posible es entre 1 y 100") 
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      discountPercent: "",
      active:false ,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        background: '#DFDCD3',
        icon: 'success',
        title: 'Creado',
        showConfirmButton: false,
        timer: 1500
      })
      await dispatch(postDiscount(values));
      resetForm({ values: "" });
     await dispatch(getAllDiscount())
    //   setSwitc(false)
    // e.target.touched= false
    // setReRender( `se ha creado ${formik.values.name}`)
    },
  });


  return (

      <Box
        component="form"
        noValidate
        autoComplete="off"
        // onChange={(e) => handleInput(e)}
        //  onSubmit={(e) => handleSubmit(e)}
        onSubmit={formik.handleSubmit}
        sx={{m:3}}
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
          sx={{mr:3}}
        />

        <TextField
          id="outlined-basic"
          label="Descripción"
          variant="outlined"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{mr:3}}

        />
        <TextField
          id="outlined-basic"
          label="Descuento"
          variant="outlined"
          name="discountPercent"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          value={formik.values.discountPercent}
          onChange={formik.handleChange}
          error={
            formik.touched.discountPercent &&
            Boolean(formik.errors.discountPercent)
          }
          helperText={
            formik.touched.discountPercent && formik.errors.discountPercent
          }
          sx={{mr:3}}
        />
        {/* <TextField
          id="outlined-basic"
          label="Nuevo valor de la descripción"
          variant="outlined"
          name="active"
          value={formik.values.active}
          onChange={formik.handleChange}
          error={
            formik.touched.active && Boolean(formik.errors.active)
          }
          helperText={formik.touched.active && formik.errors.active}
        /> */}
        {/* <FormControlLabel
          control={
            <Switch
              // checked={loading}
              //  onChange={() => setLoading(!loading)}//
              //   onChange={(e) => changeState(e)}
              name="active"
              color="primary"
              value={formik.values.active}
              onChange={formik.handleChange}
              error={formik.touched.active && Boolean(formik.errors.active)}
              helperText={formik.touched.active && formik.errors.active}
                
            />
          }
          label="Activo"
        /> */}
        <Button  type="submit" variant="contained" color="darkGrey" size="small"> <TypographyMenu>Confirmar</TypographyMenu></Button>
      </Box>

  );
};
