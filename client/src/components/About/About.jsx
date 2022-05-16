import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Footer } from '../Footer/Footer'

export const About = () => {
  return (
    <>
      <Container sx={{textAlign: 'center', mt: 15}}>
        <Typography variant='h2' sx={{mb:10}} >
          Sobre nosotros
        </Typography>
        <Typography variant='h3' sx={{mb:10}}>
          Somos una empresa que se dedica a la mineria y criptomonedas hace mas de 10 años
        </Typography> 
        <Typography variant='h6' sx={{mb:10}}>
          Nos ubicamos en la provincia de rio negro, lugar donde recibimos y despachamos 
          pedidos que llegan y van hacia todo el mundo. 
        </Typography>
        <Typography varian='h6' sx={{mb:23}} color='primary' >
          Vos que esperas para hacerte rico con tu minadora de bitcoin? 
        </Typography>
      </Container>
      <Footer/>
    </>
  )
}
