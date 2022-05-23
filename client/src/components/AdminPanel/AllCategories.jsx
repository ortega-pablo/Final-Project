import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AdminMenuLarge from "./AdminMenuLarge";
import AdminMenuMobile from "./AdminMenuMobile";
import Bienvenida from "./Bienvenida";
import GetAllCategoriesToAdmin from "./Get/GetAllCategoriesToAdmin";

function AllCategories() {
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
          <Typography variant="h2" mt={4} color='ambar5.main' >Categorías</Typography>
          <GetAllCategoriesToAdmin/>

        </Container>
      </Container>
    </Box>
  );
}

export default AllCategories;
