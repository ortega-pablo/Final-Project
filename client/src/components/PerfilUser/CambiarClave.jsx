import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as yup from "yup";
import {
  editPasswordForUser,
  editUser,
  editUserForUser,
} from "../../redux/actions";

export const CambiarClave = ({ user, idToken, render, setRender }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    newPassword: yup
      .string("Ingrese la descripción")
      .min(8, "Password should be of minimum 8 characters length")
      .required("La nueva contraseña es requerida"),
    oldPassword: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La actual contraseña es requerida para cambiar la misma"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirma la nueva contraseña"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      newPassword: "",
      oldPassword: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        title: `¿Está seguro de modificar tu contraseña?`,
        // text: "Esta acción no se puede deshacer!",
        icon: "warning",
        background: "#DFDCD3",
        showCancelButton: true,
        confirmButtonColor: "#B6893E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newData = await dispatch(editPasswordForUser(idToken, values));
          if (newData !== undefined) {
            setRender(values);
            Swal.fire("Contraseña modificada!");
          } else {
            Swal.fire("La actual contraseña es incorrecta!");
          }
        }
      });

      //  await dispatch(editUserForUser(idToken, values));
      //  setRender(values)
      //   resetForm({ values: "" });
    },
  });

  return (
    <>
      <div>Editar Contraseña</div>

      {
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Actual Contraseña *"
              variant="outlined"
              name="oldPassword"
              type="password"
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
              autoComplete="off"
              id="password"
              label="Confirmar Contraseña"
              name="passwordConfirmation"
              type="password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              error={
                formik.touched.passwordConfirmation &&
                Boolean(formik.errors.passwordConfirmation)
              }
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
            />
            <Button type="submit">Modificar contraseña</Button>
          </Box>
        </div>
      }
    </>
  );
};
