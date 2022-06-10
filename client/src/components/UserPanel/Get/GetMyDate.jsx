import {
  Box,
  ListItemIcon,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOneUsers, getUserIdByToken } from "../../../redux/actions";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const GetMyData = () => {
  const dispatch = useDispatch();
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(0);
  useEffect(() => {
    dispatch(getUserIdByToken(idToken))
      .then((r) => r)
      .then((r) => dispatch(getDetailOneUsers(r)));
  }, [render]);

  const user = useSelector((state) => state.getDetailOneUser);

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <Typography
        sx={{ mt: "2%", mb: "2%", textAlign: "center" }}
        variant="h3"
        color="darkGrey.main"
      >
        Tu perfil
      </Typography>
      <TableContainer component={Paper} align="center">
        <Table aria-label="collapsible table">
          <TableRow sx={{ width: "100%" }}>
            <TableCell sx={{ width: "10%" }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
            </TableCell>

            <TableCell sx={{ width: "30%" }}>
              <Typography variant="h5">
                Usuario:
              </Typography>
            </TableCell>

            <TableCell sx={{ width: "60%" }}>
              <Typography variant="h6" >
                {user.userName}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
            </TableCell>

            <TableCell>
              <Typography variant="h5" >
                Nombre:
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6" >
                {user.firstName}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
            </TableCell>

            <TableCell>
              <Typography variant="h5" >
                Apellido:
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6" >
                {user.lastName}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <ListItemIcon>
                <AlternateEmailIcon />
              </ListItemIcon>
            </TableCell>

            <TableCell>
              <Typography variant="h5" >
                E-mail:
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6" >
                {user.email}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
            </TableCell>

            <TableCell>
              <Typography variant="h5" >
                Teléfono:
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6" >
                {user.phone}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
            </TableCell>

            <TableCell>
              <Typography variant="h5">
                Usuario desde:
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6" >
                {user?.createdAt?.slice(0, 10)}
              </Typography>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GetMyData;
