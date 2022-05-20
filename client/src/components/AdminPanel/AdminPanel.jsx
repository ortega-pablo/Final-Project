import { Container, Link, Typography } from '@mui/material'
import React from 'react'

export const AdminPanel = () => {
  return (
    <Container>
      <Typography variant='h2'>
        Hola admin
      </Typography>
      <Link href='/createProduct'>
        Crear un nuevo producto
      </Link>
    </Container>
  )
}
