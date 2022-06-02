import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as yup from "yup";
import { postRegisterUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const validationSchema = yup.object({
  userName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),

  phone: yup.string().required("Phone number is required"),
  /* .matches(
/^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
      "Invalid phone number"
    ) */ 
  email: yup
    .string()
    .email()
    .required("Por favor ingrese un email"),

  password: yup
    .string()
    .required("Por favor ingrese una contraseña")
    .min(6, "La contraseña debe contener mínimo 6 caracteres"),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'debe coincidir con la contraseña')
});

export const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errorValidate, setErrorValidate] = useState(null);
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(postRegisterUser(values));
      console.log("El resultado es: ", result)
      if (result?.data?.error) {
        Swal.fire({
          background: '#DFDCD3',
          confirmButtonColor: '#B6893E',
          icon: 'error',
          title: 'Oops...',
          text: 'Esta direccion de correo ya está registrada'
        })
        setErrorValidate(true);
      } else {
        Swal.fire({
          background: '#DFDCD3',
          icon: 'success',
          title: 'Creado con éxito',
          showConfirmButton: true,
          confirmButtonColor: '#B6893E',
          timer: 1500
        })
        navigate('/login')
        setErrorValidate(null);
      }
    },
  });


  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
          mb: "6.5%",
          mt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Nombre"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="phone"
            label="Numero Telefonico"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Confirmar Contraseña"
            name="passwordConfirmation"
            type="password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />

          <Button
            type="submit"
            fullWidth
            color="ambar3"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formik.dirty}
          >
            Crear cuenta
          </Button>
        </form>
      </Container>
    </>
  );
};
