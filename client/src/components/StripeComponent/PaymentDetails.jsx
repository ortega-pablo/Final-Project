import { Divider } from '@mui/material';
import React from 'react';
import { ReviewDetails } from './ReviewDetails';
import { AddressInfo } from './AddressInfo'
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getUserIdByToken, postNewPaymentMethod } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

export const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const address = useSelector(state => state.shippingData);
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    console.log(paymentMethod);
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
        Mobile: address.Mobile
      }, address.id, user));
      console.log("Esto es el response de tu hermana", response)
    } else {
      console.log(error);
    }
    elements.getElement(CardElement).clear();
  }
  return (
    <>
      <ReviewDetails></ReviewDetails>
      <Divider></Divider>
      <AddressInfo></AddressInfo>
      <Divider></Divider>
      <Box component='form' onSubmit={handleSubmit}>
        <CardElement></CardElement>
        <Button
          type='submit'
          variant='outlined'
        >
          Pagar
        </Button>
      </Box>
    </>
  );
}

