import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import AdminMenuLarge from './AdminMenuLarge'
import AdminMenuMobile from './AdminMenuMobile'
import GetAllProductsToAdmin from './Get/GetAllProductsToAdmin'

function AllProducts() {
  return (
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
        <Typography variant="h2" mt={4} color='ambar5.main' >Productos</Typography>
          <GetAllProductsToAdmin />
          
        </Container>
      </Container>
    </Box>
  )
}

export default AllProducts