import { Box, Container, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import GetMyData from "./Get/GetMyDate";
import { MisPreguntas } from "./Get/Questions/MisPreguntas";
import UserMenuLarge from "./UserMenuLarge";

function QuestionPanel() {
  const userStatus = useSelector((state) => state.userStatus);
  const navigate = useNavigate();

  return userStatus === "user"  ? (
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

        
      {/* <AdminMenuMobile /> */}

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
        <UserMenuLarge />

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
          <MisPreguntas/>
        </Container>
      </Container>
    </Box>
  ) : (
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
          alignSelf: "center",
          mt: "20%",
        }}
      />
    </Box>
  );
}

export default QuestionPanel;
