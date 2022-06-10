import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { getInventary, getProducts, putQuantity } from "../../../redux/actions";
import { TypographyMenu } from "../../../personalizadTheme";

export const UpdateQuantity = ({ idUpdate, productToUpdate }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    quantity: yup
      .number("El stock es numerico")
      .typeError("El stock deber ser numerico")
      .required(
        "El stock es requerido si es que lo deseas agregar.Luego tambien lo podrás hacer desde el panel de administrador"
      )
      .max(100000, "100000 es el valor maximo")
      .positive("El stock debe ser positivo"),
  });

  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      // alert(JSON.stringify(values, null, 2));
      await dispatch(putQuantity(idUpdate, values));
      await dispatch(getProducts())
      await dispatch(getInventary())
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
          label="Stock"
          variant="outlined"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />
        <Typography sx={{mt:1}}>Stock actual: {productToUpdate?.productInventory?.quantity} </Typography>
        <Typography>Stock a modificar: {formik.values.quantity} </Typography>
        <Button type="submit" variant="contained" color="darkGrey" size="small" >
          <TypographyMenu>Editar sotck</TypographyMenu> </Button>
      </Box>
    </>
  );
};
