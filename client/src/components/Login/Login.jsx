import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const validate = (input) => {
  let errors = {};
    if(input.email){
      if(!/\S+@\S+\.\S+/.test(input.email)){
        errors.email = 'Email invalido'
      }
    } else {
      errors.email = 'Campo requerido'
    }

    if(input.password) {
      if(!/(?=.*[0-9])/.test(input.password)){
        errors.password = 'Contraseña invalida'
      }
    } else {
      errors.password = 'Campo requerido'
    }
  return errors 
}



export const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  
  const handleSetInput = (event) =>{
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    })
    setErrors(validate({
      ...input,
      [event.target.name]: event.target.value,
    }))
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('errors ====> ',errors);
    console.log('input ====> ', input)
  };

  return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#375CFF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onChange={handleSetInput} noValidate sx={{ mt: 1 }}>
            { errors.email? (<TextField
              error
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />) :
              <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/createaccount" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}