import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions";
import { NotFound } from "../../NotFound/NotFound";
import AdminMenuLarge from "../AdminMenuLarge";
import AdminMenuMobile from "../AdminMenuMobile";
import GetAllUsersToAdmin from "../UserPanel/GetAllUsersToAdmin";

function UsersPanel() {
  const userStatus = useSelector((state) => state.userStatus)

  return (userStatus === "admin" || userStatus === "superAdmin") ? (
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
          <GetAllUsersToAdmin user={userStatus}  />
          
        </Container>
      </Container>
    </Box>
  ) : (
    <NotFound />
  );
}

export default UsersPanel;
