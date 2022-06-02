import { Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReviewDetails } from './ReviewDetails';
import { AddressInfo } from './AddressInfo'
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getUserIdByToken, postNewPaymentMethod } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CARD_ELEMENTS_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  maxWidth: "60%",
  style: {
    base: {
      iconColor: "ambar3",
      color: "#333", 
      fontSize: "18px",
      "::placeholder": {
        color: "ambar3",
      },
    },
    invalid: {
      color: "#e5424d",
      "::focus": {
        color:"#303238"
      }
    }
  }
}

export const PaymentDetails = ({backStep}) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cart = useSelector(state => state.cart);
  const address = useSelector(state => state.shippingData);
  const orderProducts = useSelector(state => state.prepareOrder);
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    setLoading(true);
    if (!error) {
      const id = paymentMethod.id;
      console.log("Tu hermana tiene payment methodId", id)
      const user = await dispatch(getUserIdByToken(idToken))
      const response = await dispatch(postNewPaymentMethod({
        id: id,
        amount: cart.amount,
        FirstName: address.FirstName,
        LastName: address.LastName,
        Country: address.Country,
        Address1: address.Address1,
        City: address.City,
        EmailAddress: address.EmailAddress,
        PostCode: address.PostCode,
        Mobile: address.Mobile,
        orderProducts: orderProducts,
      }, address.id, user));
      console.log("Esto es el response de tu hermana", response)
      if(response.paymentState === "success"){
        Swal.fire({
          background: "#2f2e2b",
          icon: "success",
          title: `Pago exitoso`,
          showConfirmButton: false,
          timer: 1500,
        });
      navigate(`/order/${response.id}`)
    }else{
      Swal.fire({
        background: "#2f2e2b",
        icon: "error",
        title: `Hubo inconvenientes con el pago`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/order/${response.id}`)
    }
  }
  else {
   console.log(error);
 }
    elements.getElement(CardElement).clear();
    setLoading(false);
    // navigate("/order");
  }
  return (
    <>
      <ReviewDetails></ReviewDetails>
      <Divider></Divider>
      <AddressInfo></AddressInfo>
      <Divider></Divider>
      <Box component='form' sx={{display:"flex", flexDirection:"column", justifyContent:"center"}} onSubmit={handleSubmit}>
          <Typography variant='h6'>
                Pago:
            </Typography>
          <Box component='div' sx={{width: "100%",pr:"16px", pl:"16px"}}>
          <CardElement options={CARD_ELEMENTS_OPTIONS}></CardElement>
          </Box>
          <Divider sx={{mt:"10px"}}></Divider>
        <Box sx={{mt:"10px", display:"flex", justifyContent:"space-between"}}>
            <Button  variant='contained' color='ambar3' size='small' onClick={() => backStep()}>
              Regresar
            </Button>
            <LoadingButton
              type='submit'
              variant='contained' 
              color='ambar3' 
              size='small'
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              disabled={!stripe}
            >
              Pagar 
            </LoadingButton>
        </Box>
      </Box>
    </>
  );
}

