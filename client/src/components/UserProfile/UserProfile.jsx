import React from 'react'
import {Container, Divider, Typography} from '@mui/material'

export const UserProfile = () => {

  const ls = JSON.parse(localStorage.getItem('token'))
  return (
    <Container sx={{mt: 10, textAlign: 'center'}}>
      <Typography variant='h3'>Bienvenido {ls.username}</Typography>
      <Divider/>
    </Container>
  )
}
