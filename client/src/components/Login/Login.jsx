import React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { postLoginUser, verifyToken } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Footer } from "../Footer/Footer";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  userName: yup.string("Enter your User Name").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(postLoginUser(values));
      
      if(result !== undefined){
        window.localStorage.setItem("token", JSON.stringify(result)); 
        const ls = JSON.parse(localStorage.getItem("token"))
        dispatch(verifyToken(ls?.token))
        alert('Acceso exitoso')
        navigate(`/profile/asd`)
      } else {
        alert('Datos incorrectos')
      }
    },
  });

  return (
    <>

    <Container sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Paper
        sx={{
          maxWidth: "70%",
          p: 3,
          mt: 25,
          mb: 26,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#375CFF" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
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
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Grid sx={{mt:3}}>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Olvide mi contraseña
              </Link>
            </Grid>
            <Grid item>
              <Link href="/createaccount" variant="body2" sx={{mt:2}}>
                No tienes una cuenta? Registrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
      <Footer />
    </>
  );
};
