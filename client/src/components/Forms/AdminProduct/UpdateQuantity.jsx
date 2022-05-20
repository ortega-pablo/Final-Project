import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { putQuantity } from "../../../redux/actions";

export const UpdateQuantity = ({ idUpdate, productToUpdate }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    quantity: yup
      .number("El stock es numerico")
      .typeError("El stock deber ser numerico")
      .required(
        "El stock es requerido si es que lo deseas agregar.Luego tambien lo podrás hacer desde el panel de administrador"
      )
      .positive("El stock debe ser positivo"),
  });

  const formik = useFormik({
    initialValues: {
      quantity: productToUpdate?.productInventory?.quantity,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      await dispatch(putQuantity(idUpdate, values));
     
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
        <h3>Stock: {formik.values.quantity} </h3>
        <Button type="submit">Editar sotck</Button>
      </Box>
    </>
  );
};
