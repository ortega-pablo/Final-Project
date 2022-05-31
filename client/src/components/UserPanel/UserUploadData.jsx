import { Box, Container, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getDetailOneUsers, getUserIdByToken } from "../../redux/actions";
import GetMyData from "./Get/GetMyDate";
import { UploadData } from "./Get/UploadData";
import { UploadPasswUser } from "./Get/UploadPasswUser";
import { UploadPasswUserG } from "./Get/UploadPasswUserG";
import UserMenuLarge from "./UserMenuLarge";

function UserUploadData() {
    const dispatch = useDispatch();
    const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
    const [render, setRender] = useState(0);
    useEffect(() => {
      dispatch(getUserIdByToken(idToken))
        .then((r) => r)
        .then((r) => dispatch(getDetailOneUsers(r)));
    }, [render]);
  
    const user = useSelector((state) => state.getDetailOneUser);




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


<UploadData/>
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

export default UserUploadData;
