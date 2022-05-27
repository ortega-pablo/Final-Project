import React, { useState } from "react";
import { Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { postNewPaymentMethod } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { AdressForm } from "./AdressForm";
import { PaymentDetails } from "./PaymentDetails";

const stripePromise = loadStripe("pk_test_51L33NHCD6H90c8ULjXu5OAse3OKL0d04GrEFX5URopqkgGd0DSxH1UigsakT1NWBXHdkvVvZ8zsKfgsd91mJlJrp008SADIZWv");

const FormCheck = () => {
    const steps = ['Direccion de envio', 'Detalles de pago'];
    const [activeStep, setActiveStep] = useState(0);

    const nexStep = () =>   setActiveStep(prevActiveStep => prevActiveStep+1);
    const backStep = () =>   setActiveStep(prevActiveStep => prevActiveStep-1);

    const Form = () => activeStep === 0 ? <AdressForm nexStep={nexStep} backStep={backStep}></AdressForm> : <PaymentDetails backStep={backStep}></PaymentDetails>

    //--------Hasta aca el codigo pertenece al stepper.--------
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        console.log(paymentMethod);
        if(!error){
            const id = paymentMethod.id;
            const response = await dispatch(postNewPaymentMethod({id: id, amount: 10000}));
            console.log(response)
        }else{
            console.log(error); 
        }
        elements.getElement(CardElement).clear();
    }
    return(
        <Box sx={{ margin: "30px", backgroundColor: "red", display:"flex", justifyContent: "center", alignItems: "center"}}>
        <Paper sx={{ width: "600px", height:"600px" }}>
            <Typography component='h1' variant='h4'>
                Checkout
            </Typography>
            <form onSubmit={handleSubmit}>
               
            <CardElement />
            <button type="submit" >Submit</button>
            </form>
            <Stepper activeStep={activeStep}>
                {steps.map(s => (
                    <Step sx={{color:"black"}} key={s}>
                        <StepLabel >{s}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Form ></Form>       
        </Paper>
        </Box>
    )
 
}


export const CheckOutForm = () => {
    return(
        <Elements stripe = {stripePromise}>
            <FormCheck></FormCheck>
            
        </Elements>
    )
}