import React from 'react'
import {Box, Container, Divider, Typography} from '@mui/material'



function Bienvenida() {
  const ls = JSON.parse(localStorage.getItem('token'))
  return (
    <Container sx={{mt: 10, display:"flex", flexDirection:"column", textAlign: 'center', alignItems:"center"}}>
      <Typography variant='h2'>¡Hola!   Bienvenido {ls.username}</Typography>

      <Divider variant="middle"/>

      <Box
                component="img"
                mt={8}
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  maxWidth: '80%',
                  padding: "2rem"
                }}
                src={"https://dk0k1i3js6c49.cloudfront.net/panel/v4/dashboard-bg.png"}
                alt={"imageDashBoard"}
              />
    </Container>
  )
}

export default Bienvenida

