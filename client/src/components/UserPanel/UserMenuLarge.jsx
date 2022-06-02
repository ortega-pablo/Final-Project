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
import { HiddenxsDown } from "../../personalizadTheme";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOneUsers, getUserIdByToken } from "../../redux/actions";

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
  
  return (
    <HiddenxsDown sx={{ borderRadius: "10px" }}>
      <Paper sx={{ height: "100%", display: "flex" }}>
        <List sx={{ width: 240, alignItems: "center" }}>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <Divider variant="middle" />

          <ListItemButton onClick={handleClick3}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Mis datos" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButton component="a" href="/myData" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Mis datos" />
              </ListItemButton>

              <Divider variant="middle" />

              {!user.loginWithGoogle ? (
                
                <ListItemButton component="a" href="/updateUser" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Modificar datos personales" />
                </ListItemButton>
              ) : (
                <ListItemButton component="a" href="/updateUserG" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Modificar datos personales" />
              </ListItemButton>
              )}

              <Divider variant="middle" />

              {!user.loginWithGoogle ? (
              <ListItemButton
                component="a"
                href="/updatePasswUser"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Modificar contraseña" />
              </ListItemButton>

              ) :   <ListItemButton
              component="a"
              href="/updatePasswUserG"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Modificar contraseña" />
            </ListItemButton>
              
              
              }

            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Preguntas" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButton component="a" href="/allQuestions" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todas las preguntas" />
              </ListItemButton>

              <Divider variant="middle" />

              {/* <ListItemButton
                component="a"
                href="/adminProducts"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButton> */}

              {/* <Divider variant="middle" /> */}

              {/* <ListItemButton
                component="a"
                href="/createProduct"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButton> */}
            </List>
          </Collapse>

          <Divider variant="middle" />

          {/* <ListItemButton onClick={handleClick5}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
            {open5 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" /> */}
{/* 
              <ListItemButton component="a" href="/allStock" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButton> */}

              {/* <Divider variant="middle" />

              <ListItemButton component="a" href="/adminStock" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButton>
            </List>
          </Collapse> */}

          {/* <Divider variant="middle" />

          <ListItemButton onClick={handleClick4}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Especificaciones" />
            {open4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" /> */}
{/* 
              <ListItemButton
                component="a"
                href="/allSpecifications"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButton>

              <Divider variant="middle" />

              <ListItemButton
                component="a"
                href="/adminSpecifications"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButton> */}

              {/* <Divider variant="middle" />

              <ListItemButton
                component="a"
                href="/createSpecification"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider variant="middle" /> */}

          {/* <ListItemButton onClick={handleClick2}>
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary="Descuentos" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButton component="a" href="/allDiscounts" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButton>

              <Divider variant="middle" /> */}

              {/* <ListItemButton
                component="a"
                href="/adminDiscounts"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButton> */}

              {/* <Divider variant="middle" />

              <ListItemButton
                component="a"
                href="/createDiscount"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButton>
            </List>
          </Collapse> */}

          {/* <Divider variant="middle" />

          <ListItemButton component="a" href="/orders" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Ventas" />
          </ListItemButton>

          <Divider variant="middle" /> */}

          {/* <ListItemButton component="a" href="/usersPanel" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItemButton>

          <Divider variant="middle" /> */}

          {/* <ListItemButton component="a" href="/askPanel" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Preguntas" />
          </ListItemButton> */}

          {/* <ListItemButton component="a" href="/banner" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Imagenes del banner" />
          </ListItemButton> */}
        </List>
      </Paper>
    </HiddenxsDown>
  );
}
