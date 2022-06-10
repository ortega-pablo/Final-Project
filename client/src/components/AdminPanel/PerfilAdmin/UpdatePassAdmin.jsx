import { Button, Paper, Table, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { editPasswordForUser, getDetailOneUsers, getUserIdByToken } from "../../../redux/actions";
import { TypographyMenu } from "../../../personalizadTheme";


export const UpdatePassAdmin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const [render, setRender] = useState(0);
    useEffect(() => {
      dispatch(getUserIdByToken(idToken))
        .then((r) => r)
        .then((r) => dispatch(getDetailOneUsers(r)));
      }, [render]);
      





  const validationSchema = yup.object({
    newPassword: yup
      .string("Ingrese la descripción")
      .min(8, "Password should be of minimum 8 characters length")
      .max(50, "El maximo de caracteres es 50")

      .required("La nueva contraseña es requerida"),
    oldPassword: yup
      .string("Ingrese la descripción")
      .max(50, "El maximo de caracteres es 50")

      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La actual contraseña es requerida para cambiar la misma"),
    passwordConfirmation: yup
      .string()
      .max(50, "El maximo de caracteres es 50")

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
            navigate(`/myDataAdm`)
            resetForm({values:""})
          } else {
            Swal.fire("La actual contraseña es incorrecta!");

            resetForm({values:""})
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
        <Box
        sx={{ mt: 5, width: "100%"}}
        component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
      >
        <Typography
          sx={{ mt: "2%", mb: "2%", textAlign: "center" }}
          variant="h3"
          color="darkGrey.main"
        >
          Cambiar contraseña
        </Typography>
        <TableContainer component={Paper} align="center" >
          <Table aria-label="collapsible table" sx={{ display:"flex", flexDirection:"column", alignItems:"center", pl:3  }}>
            <TableRow  sx={{ mt: 3, width: "98%" }}>
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
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mt: 3, width: "98%" }}>
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
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mt: 3, width: "98%" }}>
              <TextField
                 required
                 autoComplete="off"
                 id="password"
                 label="Confirmar Nueva Contraseña"
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
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mb: 3, mt: 3, width: "98%" }}>
              <Button type="submit" variant="contained" color="darkGrey" sx={{ width: "98%" }}><TypographyMenu>Modificar</TypographyMenu></Button>
            </TableRow>
          </Table>
        </TableContainer>
      </Box>


<Typography sx={{mt:"15px" , mb:"15px"}} variant="h3" > Edita tu contraseña</Typography>
    </>
  );
};
