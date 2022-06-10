
import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { postResetPassword } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate,useParams} from "react-router-dom";
import Swal from 'sweetalert2';

const validationSchema = yup.object({
    password: yup
      .string()
      .required("Por favor ingrese una contraseña")
      .min(6, "La contraseña debe contener mínimo 6 caracteres"),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'debe coincidir con la contraseña')
  });

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Token = useParams();
  const [errorValidate, setErrorValidate] = useState(null);
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(postResetPassword(values,Token.TokenE));
      if (result?.data?.error) {
        Swal.fire({
          background: '#DFDCD3',
          confirmButtonColor: '#B6893E',
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un problema verifique bien sus Datos'
        })
        setErrorValidate(true);
      } else {
        Swal.fire({
          background: '#DFDCD3',
          icon: 'success',
          title: 'Password Cambiada con éxito',
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
    <Container
    maxWidth="xs"
    sx={{
        maxWidth: "50%",
        height: "79vh",
        p: 3,
       
        textAlign: "center",
        display: "flex",
        justifyContent:"center",
        flexDirection: "column",
        alignItems: "center",
        
    }}
  >
      <Typography component="h1" variant="h5">
          Resetea tu nueva Contraseña
        </Typography>

        <form onSubmit={formik.handleSubmit}>

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
            Enviar
          </Button>
        </form>
        </Container>
  )
}

export default ResetPassword