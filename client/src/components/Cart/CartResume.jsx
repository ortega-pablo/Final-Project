import { Box, Paper, Typography, Divider } from "@mui/material"
import React from 'react'


export const CartResume = ({totalAmount}) => {
  return (
    <>
     
        <Paper>
          <Typography variant='h4' color="darkGrey.main" align="center">
            Resumen de la compra
          </Typography>
          <Divider/>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',p:1 , m:1}}>
            <Typography >
              Subtotal
            </Typography>
            <Typography >
              {totalAmount} $
            </Typography>
          </Box>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', p:1, m:1}}>
            <Typography>
              Envio 
            </Typography>
            <Typography >
              0 $
            </Typography>
          </Box>
          <Divider/>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between',p:1, m:1}}>
            <Typography variant='h6'>
              Total a pagar
            </Typography>
            <Typography variant='h6'>
              {totalAmount} $
            </Typography>

          </Box>
        </Paper>
  
    </>
  )
}
