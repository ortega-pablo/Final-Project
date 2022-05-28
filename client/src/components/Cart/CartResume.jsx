import { Box, Paper, Typography, Divider } from "@mui/material"
import React from 'react'


export const CartResume = ({totalAmount}) => {
  return (
    <>
     
        <Paper>
          <Typography variant='h4' align="center">
            Resumen de la compra
          </Typography>
          <Divider/>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',p:1}}>
            <Typography variant='h5'>
              Subtotal
            </Typography>
            <Typography variant='h6'>
              {totalAmount} $
            </Typography>
          </Box>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', p:1}}>
            <Typography variant='h5'>
              Envio gratuito
            </Typography>
            <Typography variant='h6'>
              0 $
            </Typography>
          </Box>
          <Divider/>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',p:1}}>
            <Typography variant='h4'>
              Total a pagar
            </Typography>
            <Typography variant='h5'>
              {totalAmount} $
            </Typography>

          </Box>
        </Paper>
  
    </>
  )
}
