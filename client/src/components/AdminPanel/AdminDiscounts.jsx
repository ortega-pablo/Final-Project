import { Box, CircularProgress, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { AdminDiscount } from '../Forms/adminDiscounts/AdminDiscount'
import { NotFound } from '../NotFound/NotFound'
import AdminMenuLarge from './AdminMenuLarge'
import AdminMenuMobile from './AdminMenuMobile'

function AdminDiscounts() {
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
          <Typography variant="h2" color="darkGrey.main">Administración de descuentos</Typography>
          <AdminDiscount/>

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

export default AdminDiscounts