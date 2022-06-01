import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  getProducts,
  postAddSpecificationToProduct,
} from "../../redux/actions";
import {TableSpecificationNewProduct} from "./TableSpecificationNewProduct"

export const AddSpecificationToProduct = ({newProdId, specifications, newProduct}) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    value: yup

      .string("Ingrese el nombre de la nueva categoria")
      .max(100, "La cantidad maxima de caracteres es 100")

      //  .notOneOf(allCategories.map( p=> p.name), "Ya existe esa categoría" )
      .required("El nombre es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      await dispatch(
        postAddSpecificationToProduct(newProdId, specifications, values)
      );
      await dispatch(getProducts());
      await dispatch(getProducts());

      resetForm({ values: "" });
    },
  });

  return (
    <Box >
      <Box
      display="flex"
      alignItems="center"
     
      
        component="form"
        noValidate
        autoComplete="off"
        // onChange={(e) => handleInputNewCategory(e)}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Valor de la especificación"
          variant="outlined"
          name="value"
          sx={{ml:3, mr:3}}
          // helperText={leyendaErrorName2}
          // error={errorName2}
          value={formik.values.value}
          onChange={formik.handleChange}
          error={formik.touched.value && Boolean(formik.errors.value)}
          helperText={formik.touched.value && formik.errors.value}
        />
        
        <Button type="submit" variant="contained"color="ambar4">Agregar</Button>
      </Box>
{/* <Box>
      <TableSpecificationNewProduct
      newProduct={newProduct}
      newProdId={newProdId}
      />
</Box> */}
    </Box>
  );
};
