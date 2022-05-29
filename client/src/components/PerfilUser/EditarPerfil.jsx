import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { editUser, editUserForUser } from "../../redux/actions";

export const EditarPerfil = ({ user, idToken, render, setRender }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    userName: yup
      .string("Ingrese el nombre de la nueva categoria")

      // .notOneOf(
      //   NameRepetido.map((name) => name),
      //   "Ya existe un producto con éste nombre"
      // )
      .required("El nombre es requerido"),

    firstName: yup
      .string("Ingrese la descripción")
      // .notOneOf(
      //   skuRepetido.map((sku) => sku),
      //   "Ya existe un producto con éste codigo sku"
      // )
      .required("La descripción es requerida"),
    lastName: yup
      .string("Ingrese la descripción")
      .required("La descripción es requerida"),

    phone: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    newPassword: yup
      .string("Ingrese la descripción")
       .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    oldPassword: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
      passwordConfirmation: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required("Confirma la nueva contraseña")

  });



  const formik = useFormik({
    enableReinitialize:true ,
    initialValues: {
      userName: user?.userName,
      firstName: user?.firstName,
      lastName: user?.lastName,
      // addresses: user.addresses,
      phone: user?.phone,
      newPassword: "",
      oldPassword: "",
      passwordConfirmation:""
    },
    validationSchema: validationSchema, 
    onSubmit: async (values, { resetForm }) => {
      console.log("holaaa", values);
     await dispatch(editUserForUser(idToken, values));
     setRender(values)
      resetForm({ values: "" });
    },
  });

  return (
    <>
      <div>EditarPerfil</div>

      {
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            // onChange={(e) => handleInput(e)}
            //  onSubmit={(e) => handleSubmit(e)}
            onSubmit={formik.handleSubmit}
          >
            <TextField
            focused
              id="outlined-basic"
              label="Nombre de usuario *"
              variant="outlined"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <TextField
              focused
              id="outlined-basic"
              label="Nombre *"
              variant="outlined"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
            focused
              id="outlined-basic"
              label="Apellido *"
              variant="outlined"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            {/* <TextField
              id="outlined-basic"
              label="Domicilio *"
              variant="outlined"
              name="addresses"
              value={formik.values.addresses}
              onChange={formik.handleChange}
              error={
                formik.touched.addresses && Boolean(formik.errors.addresses)
              }
              helperText={formik.touched.addresses && formik.errors.addresses}
            /> */}
            <TextField
            focused
              id="outlined-basic"
              label="Telefono *"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              id="outlined-basic"
              label="Actual Contraseña *"
              variant="outlined"
              type="password"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              helperText={
                formik.touched.oldPassword && formik.errors.oldPassword
              }
            />

            <TextField
              id="outlined-basic"
              label="Nueva Contraseña *"
              variant="outlined"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              
            />
        <TextField
           
            required
           
            id="password"
            label="Confirmar Contraseña"
            name="passwordConfirmation"
            type="password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            />
            <Button type="submit">Crear</Button>
          </Box>
        </div>
      }
    </>
  );
};
