import React from 'react'
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import {Button} from "@mui/material"


export const AddCategory = ({handleInputNewCategory, handleNewCategory}) => {
  return (


    

        <Box component="form" noValidate autoComplete="off" onChange={e=> handleInputNewCategory(e)}>
        <TextField

        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        name='name'
      />
        <TextField

        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        name='description'
      />
      <TextField

        id="outlined-basic"
        label="Imagen miniatura"
        variant="outlined"
        name='thumbnail'
      />
      <Button  onClick={(e)=>handleNewCategory(e)}>Agregar nueva categoria</Button>
        </Box> 
     
      
  )
}
