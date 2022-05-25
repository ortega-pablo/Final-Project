import { Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  getProducts,
  putRemoveOneSpecificationOneProduct,
  putValueSpecificationOneProduct,
} from "../../../redux/actions";
import { Box } from "@mui/system";

export const TableSpecific = ({ productToUpdate, idUpdate }) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [idSpec, setIdSpec] = useState("");

  

  const validationSchema = yup.object({
    value: yup
      .string("Ingrese el valor de la especificación")
      //   .notOneOf(allSpecif.map((p) => p) ,"Ya existe una especificación con ese nombre"
      // ),
      .required("El valor es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values , {resetForm}) => {
      alert(JSON.stringify(values, null, 1));
      await dispatch(putValueSpecificationOneProduct(idUpdate,idSpec ,values));
      await dispatch(getProducts())
      setUpdating(false)

      // if(!updating){
      //   resetForm({values:""})
      // }
      //   await dispatch(postAddNewSpecification(values));
      //   await dispatch(getAllSpecifications())
    },
  });
  //------funciones para editar
  function handleUpdateValueSpect(e) {
    e.preventDefault();
    setUpdating(true);
    setIdSpec(e.target.value);
  }

  //accediendo al valor de la especificacion a modificar
  // const valor = productToUpdate?.specifications.map((s) => s.name)
  //  const valorToUdate = valor.map( sp => sp.value === )
  //  console.log(valorToUdate)

  //----funcion para borrarle la especificacion
  async function handleDeleteSpecToProduct(e) {
    e.preventDefault();
    await dispatch(
      putRemoveOneSpecificationOneProduct(idUpdate, e.target.value)
    );
    await dispatch(getProducts());
  }
  return (
    <>
      {productToUpdate?.specifications.map((s) => {
        return (
          <>
            <TableRow>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.ProductSpecification.value}</TableCell>

              <Button
                value={s.id}
                onClick={(e) => handleUpdateValueSpect(e)}
                // name="delete"
                // startIcon={<EditIcon />}
              >
                Modificar
              </Button>

              <Button
                value={s.id}
                onClick={(e) => handleDeleteSpecToProduct(e)}
                // name="delete"
                // startIcon={<EditIcon />}
              >
                Eliminar
              </Button>
            </TableRow>
          </>
        );
      })}

      {updating && (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Nuevo valor"
            variant="outlined"
            name="value"
            value={formik.values.value}
            onChange={formik.handleChange}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
          
          <Button type="submit">Editar valor</Button>
          <Button type="submit" onClick={()=> {setUpdating(false)}}>Cancelar edición</Button>

        </Box>
      )}
    </>
  );
};
