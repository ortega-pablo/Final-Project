import { Paper, TextField, Typography, Button } from "@mui/material";
import React from "react";
import * as yup from "yup";

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
          variant="contained"
          sx={{ mt: 3, maxWidth: '20%', alignContent:'center' }}
        > Enviar</Button>
      </Paper>
      <Footer />
    </>
  );
};
