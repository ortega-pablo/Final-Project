import { Box, Typography } from '@mui/material'
import React from 'react'

export const UpdatePassAdminG = () => {
  return (
    <Box sx={{ display:"flex" ,mt:"25%" , width:"100%", justifyContent:"center", textAlign: "center" }}>
      <Typography 
      variant="h3"
      color="ambar5.main" >Las cuentas creadas con Google no pueden sufrir cambios de contraseña desde nuestra plataforma</Typography>
    </Box>
  )
}
