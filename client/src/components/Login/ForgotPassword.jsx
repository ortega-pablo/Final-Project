import { Paper, TextField, Typography, Button } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Footer } from "../Footer/Footer";
import { postForgotPasswordSendEmail } from "../../redux/actions";
import Swal from 'sweetalert2';

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      const result= await dispatch(postForgotPasswordSendEmail(values));
      if(result !== undefined){
        Swal.fire({
          background: '#DFDCD3',
          icon: 'success',
          title: 'Revisa la bandeja de entrada de tu correo',
          showConfirmButton: true,
          confirmButtonColor: '#B6893E',
          timer: 1500
        })
      }
      else{
        Swal.fire({
          background: '#DFDCD3',
          confirmButtonColor: '#B6893E',
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un problema verifique bien sus Datos'
        })
      }

    },
  });
  return (
    <>
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{
          mt: 20,
          mb: 27.5,
          ml: "15%",
          textAlign: "center",
          maxWidth: "70%",
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography variant="h6">
          Te enviaremos una nueva contraseña a tu correo electronico
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electronico"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type="submit"
          fullWidth
          color="ambar3"
          variant="contained"
          sx={{ mt: 3, maxWidth: '20%', alignContent:'center' }}
        > Enviar</Button>
      </Paper>

    </>
  );
};
