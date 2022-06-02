import { Button, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSpecifications,
  postAddNewSpecification,
} from "../../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';


export const AddSpecification = () => {
  const dispatch = useDispatch();
  const allSpecifications = useSelector((state) => state.allSpecifications);

  useEffect(() => {
    dispatch(getAllSpecifications());
  }, [dispatch]);

  const allSpecif = allSpecifications?.map((s) => s.name);

  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva especificacion")
      .required("El nombre es requerido")
      .max(100, "La cantidad maxima de caracteres es 100")

      .notOneOf(
        allSpecif.map((p) => p),
        "Ya existe una especificación con ese nombre"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        background: '#DFDCD3',
        icon: 'success',
        title: 'Creada',
        showConfirmButton: false,
        timer: 1500
      })

      await dispatch(postAddNewSpecification(values));
      await dispatch(getAllSpecifications());
      resetForm({ values: "" });
    },
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", mt:2, mb:2 }}>
      <InputLabel id="demo-simple-select-standard-label">
        Crear nueva especicación:
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
          sx={{ml:3, mr:3}}
        />

        <Button sx={{mt:1}}  type="submit"variant="contained" color="ambar4" >
          Crear
        </Button>
      </Box>
    </Box>
  );
};
