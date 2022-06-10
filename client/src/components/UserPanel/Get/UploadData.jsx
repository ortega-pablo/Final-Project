import {
  Button,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { TypographyMenu } from "../../../personalizadTheme";
import {
  editUserForUser,
  getDetailOneUsers,
  getUserIdByToken,
} from "../../../redux/actions";

export const UploadData = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(0);
  useEffect(() => {
    dispatch(getUserIdByToken(idToken))
      .then((r) => r)
      .then((r) => dispatch(getDetailOneUsers(r)));
  }, [render]);

  const user = useSelector((state) => state.getDetailOneUser);

  const validationSchema = yup.object({
    userName: yup
      .string("Ingrese el nombre de la nueva categoria")
      .max(30, "El maximo de caracteres es 30")

      // .notOneOf(
      //   NameRepetido.map((name) => name),
      //   "Ya existe un producto con éste nombre"
      // )
      .required("El nombre es requerido"),

    firstName: yup
      .string("Ingrese la descripción")
      .max(30, "El maximo de caracteres es 30")

      // .notOneOf(
      //   skuRepetido.map((sku) => sku),
      //   "Ya existe un producto con éste codigo sku"
      // )
      .required("La descripción es requerida"),
    lastName: yup
      .string("Ingrese la descripción")
      .max(30, "El maximo de caracteres es 30")

      .required("La descripción es requerida"),

    phone: yup
      .string("Ingrese la descripción")
      .max(30, "El maximo de caracteres es 30")

      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    currentPassword: yup
      .string("Ingrese la descripción")
      .max(30, "El maximo de caracteres es 30")

      .required(
        "La actual contraseña es requerida para hacer cambios en tu perfil"
      ),
    // oldPassword: yup
    //   .string("Ingrese la descripción")
    //   // .min(8, 'Password should be of minimum 8 characters length')
    //   .required("La actual contraseña es requerida para modificar tu perfil"),
    //   passwordConfirmation: yup.string()
    // .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    // .required("Confirma la nueva contraseña")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: user?.userName,
      firstName: user?.firstName,
      lastName: user?.lastName,
      // addresses: user.addresses,
      phone: user?.phone,
      // newPassword: "",
      currentPassword: "",
      // passwordConfirmation:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        title: `¿Está seguro de modificar a ${user.userName}?`,
        // text: "Esta acción no se puede deshacer!",
        icon: "warning",
        background: "#DFDCD3",
        showCancelButton: true,
        confirmButtonColor: "#B6893E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, modificar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newData = await dispatch(editUserForUser(idToken, values));
          if (newData !== undefined) {
            setRender(values);
            Swal.fire("Modificado!");
            navigate(`/myData`);
          } else {
            Swal.fire("La password es incorrecta!");
          }
        }
      });
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
          Editar tus datos
        </Typography>
        <TableContainer component={Paper} align="center" >
          <Table aria-label="collapsible table" sx={{ display:"flex", flexDirection:"column", alignItems:"center", pl:3  }}>
            <TableRow  sx={{ mt: 3, width: "98%" }}>
              <TextField
                focused
                id="outlined-basic"
                label="Nombre de usuario *"
                variant="outlined"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mt: 3, width: "98%" }}>
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
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mt: 3, width: "98%" }}>
              <TextField
                focused
                id="outlined-basic"
                label="Apellido *"
                variant="outlined"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mt: 3, width: "98%" }}>
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
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mt: 3, width: "98%" }}>
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="Actual Contraseña *"
                variant="outlined"
                type="password"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
                sx={{ width: "98%" }}
              />
            </TableRow>

            <TableRow sx={{ mb: 3, mt: 3, width: "98%" }}>
              <Button type="submit" variant="contained" color="darkGrey" sx={{ width: "98%" }}> <TypographyMenu>Modificar</TypographyMenu> </Button>
            </TableRow>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
