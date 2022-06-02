import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { getCartById, postNewPaymentMethod } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { AdressForm } from "./AdressForm";
import { PaymentDetails } from "./PaymentDetails";

const stripePromise = loadStripe(
  "pk_test_51L33NHCD6H90c8ULjXu5OAse3OKL0d04GrEFX5URopqkgGd0DSxH1UigsakT1NWBXHdkvVvZ8zsKfgsd91mJlJrp008SADIZWv"
);

const FormCheck = () => {
  const token = JSON.parse(window.localStorage.getItem("token"))?.token;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartById(token));
  }, [dispatch]);
  const steps = ["Direccion de envio", "Detalles de pago"];
  const [activeStep, setActiveStep] = useState(0);

  const nexStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm nexStep={nexStep} backStep={backStep}></AdressForm>
    ) : (
      <PaymentDetails backStep={backStep}></PaymentDetails>
    );

  //--------Hasta aca el codigo pertenece al stepper.--------
  return (
    <Box
      sx={{
        margin: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "700px",
          minHeight: "600px",
          padding: "15px",
          margin: "10px",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
          Verificación
        </Typography>
        <Box
          disablePadding
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Stepper
            activeStep={activeStep}
            disablePadding
            sx={{ mt: "5px", width: "500px" }}
          >
            {steps.map((s) => (
              <Step key={s}>
                <StepLabel>{s}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Form></Form>
      </Paper>
    </Box>
  );
};

export const CheckOutForm = () => {
  const orderProducts = useSelector((state) => state.prepareOrder);
  return (
    <Elements stripe={stripePromise}>
      <FormCheck></FormCheck>
    </Elements>
  );
};
