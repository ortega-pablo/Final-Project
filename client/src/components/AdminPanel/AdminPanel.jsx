import { Box, Container } from "@mui/material";
import React from "react";
import AdminMenuLarge from "./AdminMenuLarge";
import AdminMenuMobile from "./AdminMenuMobile";

function AdminPanel() {
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


            
        </Container>
      </Container>
    </Box>
  );
}

export default AdminPanel;
