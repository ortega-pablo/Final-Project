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
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function AdminMenuLarge() {


  const dispatch = useDispatch();
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(0);
  useEffect(() => {
    dispatch(getUserIdByToken(idToken))
      .then((r) => r)
      .then((r) => dispatch(getDetailOneUsers(r)));
  }, [render]);

  const user = useSelector((state) => state.getDetailOneUser);



  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);


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
  const handleClick7 = () => {
    setOpen7(!open7);
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
            <ListItemText primary="Categorías" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/allCategories"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todas" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/adminCategories"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/createCategory"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButtonMenu>
            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/allProducts" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/adminProducts"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/createProduct"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButtonMenu>
            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick5}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
            {open5 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/allStock" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/adminStock" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButtonMenu>
            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick4}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Especificaciones" />
            {open4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/allSpecifications"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/adminSpecifications"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/createSpecification"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButtonMenu>
            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu onClick={handleClick2}>
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary="Descuentos" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButtonMenu>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Divider variant="middle" />

              <ListItemButtonMenu component="a" href="/allDiscounts" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ClearAllIcon />
                </ListItemIcon>
                <ListItemText primary="Todos" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/adminDiscounts"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>
                <ListItemText primary="Administrar" />
              </ListItemButtonMenu>

              <Divider variant="middle" />

              <ListItemButtonMenu
                component="a"
                href="/createDiscount"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Crear" />
              </ListItemButtonMenu>
            </List>
          </Collapse>

          <Divider variant="middle" />

          <ListItemButtonMenu component="a" href="/orders" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Ventas" />
          </ListItemButtonMenu>

          <Divider variant="middle" />

          <ListItemButtonMenu component="a" href="/usersPanel" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButtonMenu>

          <Divider variant="middle" />

          <ListItemButtonMenu component="a" href="/askPanel" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Preguntas" />
          </ListItemButtonMenu>

          
          <ListItemButtonMenu component="a" href="/banner" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Imagenes del banner" />
          </ListItemButtonMenu>

          <Divider variant="middle" />

<ListItemButtonMenu onClick={handleClick6}>
  <ListItemIcon>
    <CategoryIcon />
  </ListItemIcon>
  <ListItemText primary="Mi perfil" />
  {open6 ? <ExpandLess /> : <ExpandMore />}
</ListItemButtonMenu>
<Collapse in={open6} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <Divider variant="middle" />

    <ListItemButtonMenu
      component="a"
      href="/myDataAdm"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ClearAllIcon />
      </ListItemIcon>
      <ListItemText primary="Mi perfil" />
    </ListItemButtonMenu>

    <Divider variant="middle" />
   


    {!user.loginWithGoogle ? 

    <ListItemButtonMenu
      component="a"
      href="/updateAdmin"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Modificar datos" />
    </ListItemButtonMenu>
     :
      <ListItemButtonMenu
    component="a"
    href="/updateAdminG"
    sx={{ pl: 4 }}
  >
    <ListItemIcon>
      <ModeEditIcon />
    </ListItemIcon>
    <ListItemText primary="Modificar datos" />
  </ListItemButtonMenu>
}
    <Divider variant="middle" />


    {!user.loginWithGoogle ? (

    <ListItemButtonMenu
      component="a"
      href="/updatePasswAdmin"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
      <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Modificar contraseña" />
    </ListItemButtonMenu>

    ): 
    (
      <ListItemButtonMenu
      component="a"
      href="/updatePasswAdminG"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
      <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Modificar contraseña" />
    </ListItemButtonMenu>
    )
  
  }


  </List>
</Collapse>
<ListItemButtonMenu onClick={handleClick7}>
  <ListItemIcon>
    <ListAltIcon />
  </ListItemIcon>
  <ListItemText primary="Ordenes" />
  {open7 ? <ExpandLess /> : <ExpandMore />}
</ListItemButtonMenu>
<Collapse in={open7} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <Divider variant="middle" />

   

    <ListItemButtonMenu
      component="a"
      href="/allOrdersAdmin"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Administrar" />
    </ListItemButtonMenu>
  

    <Divider variant="middle" />
  </List>
</Collapse>




        </List>
      </Paper>
    </HiddenxsDown>
  );
}
