import React , {useEffect} from "react";
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
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";

const idClientGoogleLogin = '280929991691-j01v9mb0k5nlg3ob57rgk4hf1qcbrk9a.apps.googleusercontent.com'



const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .required("Email is required"),
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
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(postLoginUser(values));
      
      if(result !== undefined){
        window.localStorage.setItem("token", JSON.stringify(result)); 
        const ls = JSON.parse(localStorage.getItem("token"))
        dispatch(verifyToken(ls?.token))
        Swal.fire({
          background: '#DFDCD3',
          icon: 'success',
          title: 'Logeado',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(`/`)
      } else {
        Swal.fire({
          background: '#DFDCD3',
          confirmButtonColor: '#B6893E',
          icon: 'error',
          title: 'Oops...',
          text: 'Los datos que ingresaste son incorrectos'
        })

      }
        
        
      
    },
  });

  useEffect(() => {
    function start() {
    gapi.client.init({
    clientId:idClientGoogleLogin,
    scope: 'email',
      });
       }
      gapi.load('client:auth2', start);
       }, []);


  const handleLoginGoogle = async (googleData) => {

    const res = await fetch(`http://localhost:3001/users/google-login`, {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();
    console.log("RPTA BACK", data)
    window.localStorage.setItem("token", JSON.stringify(data)); 
    const ls = JSON.parse(localStorage.getItem("token"))
    dispatch(verifyToken(ls?.token))
    Swal.fire({
      background: '#DFDCD3',
      icon: 'success',
      title: 'Logeado',
      showConfirmButton: false,
      timer: 1500
    })
    navigate(`/`)
  }

  function handleFailureGoogle (fail){
    console.log("ERROR LOGEO GOOGLE",JSON.stringify (fail)) 
  }

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
            color="ambar3.main"
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
          <GoogleLogin
                    clientId={idClientGoogleLogin}
                    buttonText="Logeate con Google"
                    onSuccess={handleLoginGoogle}
                    onFailure={handleFailureGoogle}
                    cookiePolicy={'single_host_origin'}
          />
        </Box>
      </Paper>
    </Container>

    </>
  );
};

