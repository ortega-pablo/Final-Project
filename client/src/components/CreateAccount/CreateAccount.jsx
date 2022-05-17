import React, { useState } from 'react'
import { Container } from '@mui/material'

export const CreateAccount = () => {
  const [input, setInput] = useState ({
    name:'',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
  })
  const [errors, setErrors] = useState({})

  
  return (
    // <Container component="main" maxWidth="xs" >
    //   <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //   >
    //   </Box>
    // </Container>
    <p> ANDO </p>
  )
}
