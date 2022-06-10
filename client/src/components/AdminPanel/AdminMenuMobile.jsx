import React, { useEffect, useState } from "react";

import {
  ListItemButton,
  Collapse,
  List,
  ListItemIcon,
  Divider,
  Paper,
  ListItemText,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { HiddensmUp } from "../../personalizadTheme";

import HomeIcon from "@mui/icons-material/Home";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SellIcon from "@mui/icons-material/Sell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOneUsers, getUserIdByToken } from "../../redux/actions";

function validate(value) {
  let errors = {};
  if (isNaN(value.Desde)) errors.Desde = "Por favor ingrese un número.";
  if (isNaN(value.Hasta)) errors.Hasta = "Por favor ingrese un número.";
  if (value.Desde > value.Hasta) errors.Desde = "Este valor debe ser un mínimo";
  errors.Desde = "Este valor debe ser un máximo";
  if (value.Desde < 0) errors.Desde = "El valor debe ser mayor o igual a 0";
  if (value.Hasta < 0) errors.Hasta = "El valor debe ser mayor o igual a 0";
  return errors;
}

function AdminMenuMobile({
  handleClickForCategories,
  handleClickForSubcategories,
  handleClickSubmitPerPrice,
}) {



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
    <HiddensmUp
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper sx={{ display: "flex", width: "100%" }}>
        <ListItemButton onClick={handleClick6}>
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="Filtros" />
          {open6 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Paper>

      <Collapse in={open6} timeout="auto" unmountOnExit>
        <Paper
          sx={{
            maxHeight: "400px",
            display: "flex",
            width: 260,
            position: "fixed",
            alignSelf: "center",
            left: "50%",
            marginLeft: "-130px",
            overflowY: "scroll",
            scrollbarColor: "background.paper",
          }}
        >
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
              <ListItemText primary="Categorías" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Divider variant="middle" />

                <ListItemButton
                  component="a"
                  href="/allCategories"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <ClearAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="Todas" />
                </ListItemButton>

                <Divider variant="middle" />

                <ListItemButton
                  component="a"
                  href="/adminCategories"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administrar" />
                </ListItemButton>

                <Divider variant="middle" />

                <ListItemButton
                  component="a"
                  href="/createCategory"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Crear" />
                </ListItemButton>
              </List>
            </Collapse>

            <Divider variant="middle" />

            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Divider variant="middle" />

                <ListItemButton
                  component="a"
                  href="/allProducts"
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
                  href="/adminProducts"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administrar" />
                </ListItemButton>

                <Divider variant="middle" />

                <ListItemButton
                  component="a"
                  href="/createProduct"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Crear" />
                </ListItemButton>
              </List>
            </Collapse>

            <Divider variant="middle" />

            <ListItemButton onClick={handleClick5}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Stock" />
              {open5 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open5} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Divider variant="middle" />

                <ListItemButton component="a" href="/allStock" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ClearAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="Todos" />
                </ListItemButton>

                <Divider variant="middle" />

                <ListItemButton component="a" href="/adminStock" sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administrar" />
                </ListItemButton>
              </List>
            </Collapse>

            <Divider variant="middle" />

            <ListItemButton onClick={handleClick4}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Especificaciones" />
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Divider variant="middle" />

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
                </ListItemButton>

                <Divider variant="middle" />

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

            <Divider variant="middle" />

            <ListItemButton onClick={handleClick2}>
              <ListItemIcon>
                <SellIcon />
              </ListItemIcon>
              <ListItemText primary="Descuentos" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Divider variant="middle" />

                <ListItemButton
                  component="a"
                  href="/allDiscounts"
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
                  href="/adminDiscounts"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <ModeEditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administrar" />
                </ListItemButton>

                <Divider variant="middle" />

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
            </Collapse>

            <Divider variant="middle" />

            <ListItemButton>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Ventas" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton component="a" href="/usersPanel">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton component="a" href="/askPanel" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Preguntas" />
            </ListItemButton>
          </List>
          <ListItemButton component="a" href="/banner" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Imagenes del banner" />
          </ListItemButton>
          
          
          <Divider variant="middle" />

<ListItemButton onClick={handleClick7}>
  <ListItemIcon>
    <CategoryIcon />
  </ListItemIcon>
  <ListItemText primary="Mi perfil" />
  {open7 ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>
<Collapse in={open7} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <Divider variant="middle" />

    <ListItemButton
      component="a"
      href="/myDataAdm"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ClearAllIcon />
      </ListItemIcon>
      <ListItemText primary="Mi perfil" />
    </ListItemButton>

    <Divider variant="middle" />
   


    {!user.loginWithGoogle ? 

    <ListItemButton
      component="a"
      href="/updateAdmin"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
        <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Modificar datos" />
    </ListItemButton>
     :
      <ListItemButton
    component="a"
    href="/updateAdminG"
    sx={{ pl: 4 }}
  >
    <ListItemIcon>
      <ModeEditIcon />
    </ListItemIcon>
    <ListItemText primary="Modificar datos" />
  </ListItemButton>
}
    <Divider variant="middle" />


    {!user.loginWithGoogle ? (

    <ListItemButton
      component="a"
      href="/updatePasswAdmin"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
      <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Modificar contraseña" />
    </ListItemButton>

    ): 
    (
      <ListItemButton
      component="a"
      href="/updatePasswAdminG"
      sx={{ pl: 4 }}
    >
      <ListItemIcon>
      <ModeEditIcon />
      </ListItemIcon>
      <ListItemText primary="Modificar contraseña" />
    </ListItemButton>
    )
  
  }


  </List>
</Collapse>



          
        </Paper>
      </Collapse>
    </HiddensmUp>
  );
}

export default AdminMenuMobile;
