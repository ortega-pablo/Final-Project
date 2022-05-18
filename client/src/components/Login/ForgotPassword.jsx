import { Box, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { Footer } from "../Footer/Footer";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
export const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{
          mt: 30,
          mb: 49,
          ml: '25%',
          textAlign: "center",
          maxWidth: "50%",
          p: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant='h6' >
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
      </Paper>
      <Footer />
    </>
  );
};
