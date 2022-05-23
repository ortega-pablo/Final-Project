import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { getAllDiscount, postDiscount, putDiscount } from "../../../redux/actions";
import Swal from "sweetalert2";



export const UpdateDiscount = ({allDiscounts, idUpdate, setUpdating}) => {
  const dispatch = useDispatch();


const discountForUpd = allDiscounts?.find( d => d.id ==idUpdate)
console.log(discountForUpd)

const nameRepetido = allDiscounts.filter( p => p.id !=idUpdate )
const NameRepetido = nameRepetido.map((p) => p.name);

console.log(NameRepetido)
  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf( nameRepetido.map((p) => p.name)  ,"Ya existe un descuento con este nombre")
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
      name: discountForUpd?.name,
      description:discountForUpd?.description,
      discountPercent: discountForUpd?.discountPercent,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      
      Swal.fire({
        background: '#DFDCD3',
        icon: 'success',
        title: 'Exito',
        showConfirmButton: false,
        timer: 1500
      })
      await dispatch(putDiscount(idUpdate, values))
      await dispatch(getAllDiscount())
      resetForm({ values: "" });
      setUpdating(false)
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
      >
        <h3> Creando</h3>
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
          label="Descripción"
          variant="outlined"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
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
        <Box sx={{textAlign:'center'}}>
        <Button  type="submit" variant='contained' color="ambar3">Confirmar</Button>
        <Button  type="click" onClick={()=>setUpdating(false)} variant='contained' color="ambar3">Cancelar</Button>

        </Box>

      </Box>

  );
};
