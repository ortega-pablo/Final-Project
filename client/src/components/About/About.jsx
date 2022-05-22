import { Container, Typography } from '@mui/material'
import React from 'react'

export const About = () => {
  return (
    <>
      <Container >
        <Typography  align="center" variant='h1' color='text.primary' mt={14} >
          Sobre nosotros
        </Typography>
        <Typography align="center" variant='h3' color='text.primary' mt={8} >
          Somos una empresa que se dedica a la mineria y criptomonedas hace mas de 10 años
        </Typography> 
        <Typography align="center" variant='h6' color='text.primary' mt={8} >
          Nos ubicamos en la provincia de rio negro, lugar donde recibimos y despachamos 
          pedidos que llegan y van hacia todo el mundo. 
        </Typography>
        <Typography align="center" variant='h6' color='text.secondary' mt={6} mb={14} >
          Vos que esperas para hacerte rico con tu minadora de bitcoin? 
        </Typography>
      </Container>
    </>
  )
}
