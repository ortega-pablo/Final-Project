import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
<<<<<<< HEAD
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Footer } from "../Footer/Footer";
=======
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import {useFormik} from 'formik'
import * as yup from 'yup';
import {postRegisterUser} from '../../redux/actions'
import { useDispatch } from 'react-redux';
const validationSchema = yup.object({
  userName: yup.string() 
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Firstname is required"),
>>>>>>> 735a80ce980f60b29536f302b4d16d4add36cf39

  firstName: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),

  lastName: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),

  phone: yup.string()
    .required("Phone number is required")
    /* .matches(
/^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
      "Invalid phone number"
    ) */,

  email: yup.string().email().required("Email is required"),

  password: yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
});


export const CreateAccount = () => {
  const dispatch  = useDispatch();
  const [errorValidate, setErrorValidate]  = useState (null)
  const formik = useFormik({
    initialValues: {
      userName: 'aaa',
      firstName: 'aaa', 
      lastName: 'aaa',
      phone: '123',
      email: 'jose@gmail.com',
      password: '12312213',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("antes de la alerta")
      //alert(JSON.stringify(values, null, 2));
      console.log("antes")
      const result =  await dispatch(postRegisterUser(values))
      console.log("COMO LO TRAIGO",result)
      if (result?.data?.error ){
        setErrorValidate(true)
        console.log("entre al validate error")
      }
      else {
        setErrorValidate(null)
        console.log("entreeee nulll")
      }
    },
  });


  return (
<<<<<<< HEAD
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ textAlign: "center", mb: 7 }}
      >
      <Typography variant='h3' sx={{mt:10}}>
      Crea tu cuenta
      </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            onChange={handleSetInput}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email}
              helperText={errors.email}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              error={errors.userName}
              helperText={errors.userName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              error={errors.password}
              helperText={errors.password}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              error={errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              error={errors.lastName}
              helperText={errors.lastName}
            />

            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              error={errors.phone}
              helperText={errors.phone}
            />

            {/* <FormControlLabel
            control={<Checkbox value="aceptTerms" color="primary" />}
            label="Acepto los terminos y condiciones"
            id="aceptTerms"
          />

          <Link href="https://google.com" target="_blank">
            <Typography>Ver terminos y condiciones</Typography>
          </Link> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
=======
   /*  <Container
      component="main"
      maxWidth="xs"
      sx={{ textAlign: "center", mb: "6.5%" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
        }}
      > */
      <>
        <Avatar sx={{  m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        <form onSubmit={formik.handleSubmit} >
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
            id="password"
            label="Password"
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
            id="firstName"
            label="First Name"
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
            label="Last Name"
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
            label="Phone Number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorValidate && <p> {"ERROR"}</p>}
          </form>
     
>>>>>>> 735a80ce980f60b29536f302b4d16d4add36cf39
    </>
  );
};
