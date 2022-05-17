import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Footer } from "../Footer/Footer";

const validate = (input) => {
  let errors = {};
  //email validations
  if (input.email) {
    if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "Invalid Email";
    }
  } else {
    errors.email = "Field required";
  }
  // userName validations
  if (input.userName) {
    if (input.userName.match(/[^A-Za-z0-9]/)) {
      errors.userName = "This field can only contains letters and numbers";
    }
  } else {
    errors.userName = "Field required";
  }
  //password validations /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
  if (input.password) {
    if (input.password.match(/^([^ ]){8,15}$/)) {
      //hay que arreglar
    }
  } else {
    errors.password = "Field required";
  }
  //firstName validations
  if (input.firstName) {
    if (input.firstName.replace(/ /g, "").match(/[^A-Za-z]/)) {
      errors.firstName = "This field can only contains letters";
    } else if (input.firstName.lenght > 20) {
      errors.firstName = "This field cannot contain more than 20 characters";
    }
  } else {
    errors.firstName = "Field required";
  }
  //lastName validations
  if (input.lastName) {
    if (input.lastName.replace(/ /g, "").match(/[^A-Za-z]/)) {
      errors.lastName = "This field can only contains letters";
    } else if (input.lastName.lenght > 20) {
      errors.lastName = "This field cannot contain more than 20 characters";
    }
  } else {
    errors.lastName = "Field required";
  }

  //phone validations
  // no anda
  if (input.phone) {
    if (input.phone.toString().lenght > 20) {
      errors.phone = "Phone numbers do not contain more than 20 characters";
    }
  } else {
    errors.phone = "Field required";
  }

  return errors;
};

export const CreateAccount = () => {
  const [input, setInput] = useState({
    email: "",
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleSetInput = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit errors ====> ", errors);
    console.log("submit input ====> ", input);
  };

  return (
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
    </>
  );
};
