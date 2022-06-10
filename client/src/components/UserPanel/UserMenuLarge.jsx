import React, { useEffect, useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SellIcon from "@mui/icons-material/Sell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import { HiddenxsDown, ListItemButtonMenu } from "../../personalizadTheme";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOneUsers, getUserIdByToken } from "../../redux/actions";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function UserMenuLarge() {
  const dispatch = useDispatch();
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(0);
  useEffect(() => {
    dispatch(getUserIdByToken(idToken))
      .then((r) => r)
      .then((r) => dispatch(getDetailOneUsers(r)));
  }, [render]);

  const user = useSelector((state) => state.getDetailOneUser);
  console.log(user)
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleClick4 = () => {
    setOpen4(!open4);
  };

  const handleClick5 = () => {
    setOpen5(!open5);
  };

  const handleClick6 = () => {
    setOpen6(!open6);
  };
  
  return (
    <HiddenxsDown sx={{ borderRadius: "10px" }}>
      <Paper sx={{ height: "100%", display: "flex" }}>
        <List sx={{ width: 240, alignItems: "center" }}>
          <ListItemButtonMenu component="a" href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButtonMenu>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick3}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Mis datos" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/myData" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Mis datos" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              {!user.loginWithGoogle ? (
                
                <ListItemButtonMenu component="a" href="/updateUser" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Modificar datos personales" />
                </ListItemButtonMenu>
              ) : (
                <ListItemButtonMenu component="a" href="/updateUserG" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Modificar datos personales" />
              </ListItemButtonMenu>
              )}

              <Divider variant="middle" />

              {!user.loginWithGoogle ? (
              <ListItemButtonMenu
                component="a"
                href="/updatePasswUser"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Modificar contraseña" />
              </ListItemButtonMenu>

              ) :   <ListItemButtonMenu
              component="a"
              href="/updatePasswUserG"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Modificar contraseña" />
            </ListItemButtonMenu>
              
              
              }

            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick}>
            <ListItemIcon>
              <QuestionMarkIcon />
            </ListItemIcon>
            <ListItemText primary="Preguntas" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/allQuestions" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todas las preguntas" />
              </ListItemButtonMenu>

              <Divider variant="middle" />
            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick6}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
            {open6 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/myOrders" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todas mis ordenes" />
              </ListItemButtonMenu>

              <Divider variant="middle" />
            </List>
          </Collapse>
        </List>
      </Paper>
    </HiddenxsDown>
  );
}
