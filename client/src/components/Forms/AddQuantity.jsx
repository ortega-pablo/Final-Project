import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { getProducts, postAddQuantity, putQuantity } from "../../redux/actions";


export const AddQuantity = ({handleInputQue, handleStock, inputQ, newProdId, newProduct}) => {
const dispatch = useDispatch()

const products = useSelector((state) => state.products);
// useEffect(() => {
//   dispatch(getProducts());
// }, [dispatch]);

// const newProduct = products.find((p) => p.id === newProdId);
 
const validationSchema = yup.object({
    quantity: yup
    .number("El stock es numerico").typeError("El stock deber ser numerico")
    .required("El stock es requerido si es que lo deseas agregar.Luego tambien lo podrás hacer desde el panel de administrador").positive("El stock debe ser positivo"),
    
    
  });



  const formik = useFormik({
    initialValues: {
        quantity: "",
    
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      alert(JSON.stringify(values, null, 2));
    
      // await dispatch(postAddQuantity(newProdId, values));// DEBEMOS USAR LA PUT
      await dispatch(putQuantity(newProdId, values));

      await dispatch(getProducts())
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
        <h3>Stock actual: {newProduct?.productInventory?.quantity} </h3>
        <h3>Stock a modificar: {formik.values.quantity} </h3>
        <Button type="submit">Agregar sotck</Button>
      </Box>
    </>
  );
};
