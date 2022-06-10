import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { AddSpecification } from '../Forms/AddSpecification/AddSpecification'
import { NotFound } from '../NotFound/NotFound'
import AdminMenuLarge from './AdminMenuLarge'
import AdminMenuMobile from './AdminMenuMobile'

function CreateSpecification() {
  const userStatus = useSelector((state) => state.userStatus);
    return (
      userStatus === "admin" || userStatus === "superAdmin" ?
        <Box
          maxWidth="vp"
          sx={{
            gap: 0,
            display: "flex",
            flexDirection: "column",
            margin: 0,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <AdminMenuMobile />
    
          <Container
            maxWidth="vp"
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              marginTop: 1,
              padding: 0,
            }}
          >
            <AdminMenuLarge />
    
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                padding: 0,
                alignItems: "center",
              }}
            >
              <Typography variant="h2" color="darkgrey.main">Crear especificación</Typography>
              <Paper sx={{p:2, mt:3}}>
              <AddSpecification/>
              </Paper>

            </Container>
          </Container>
        </Box>
        :
        <Box
        maxWidth="vp"
        sx={{
          gap: 0,
          display: "flex",
          flexDirection: "column",
          margin: 0,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <CircularProgress
          sx={{
            alignSelf: 'center',
            mt: '20%'
          }}
        /> 
        </Box>
      )
}

export default CreateSpecification