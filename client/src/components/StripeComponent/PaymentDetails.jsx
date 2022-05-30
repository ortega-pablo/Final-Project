import { Divider } from '@mui/material';
import React from 'react';
import { ReviewDetails } from './ReviewDetails';
import {AddressInfo} from './AddressInfo'

export const PaymentDetails = () => {

    return (
        <>
          <ReviewDetails></ReviewDetails>
          <Divider></Divider>
          <AddressInfo></AddressInfo>
          <Divider></Divider>
          
        </>
      );
}
 
