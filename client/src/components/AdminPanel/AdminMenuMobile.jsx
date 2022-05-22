import React from 'react';

import { ListItemButton, Collapse, List, ListItemIcon,  Divider, Paper, ListItemText } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { HiddensmUp } from '../../personalizadTheme';


import HomeIcon from '@mui/icons-material/Home';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SellIcon from '@mui/icons-material/Sell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

function validate(value) {
  let errors = {};
  if (isNaN(value.Desde)) errors.Desde = "Por favor ingrese un número.";
  if (isNaN(value.Hasta)) errors.Hasta = "Por favor ingrese un número.";
  if (value.Desde > value.Hasta)
    errors.Desde = "Este valor debe ser un mínimo";
    errors.Desde = "Este valor debe ser un máximo";
  if(value.Desde < 0) errors.Desde = "El valor debe ser mayor o igual a 0"
  if(value.Hasta < 0) errors.Hasta = "El valor debe ser mayor o igual a 0"
  return errors;
}



function AdminMenuMobile({handleClickForCategories, handleClickForSubcategories, handleClickSubmitPerPrice}) {

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

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
  
  return (
    <HiddensmUp sx={{display:"flex", flexDirection:"column", alignItems:"center"}} >
      <Paper sx={{ display: "flex", width: "100%"}}>
      <ListItemButton onClick={handleClick4} >
            <ListItemIcon>
              <FilterListIcon />
            </ListItemIcon>
            <ListItemText primary="Filtros" />
            {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      </Paper>

      <Collapse in={open4} timeout="auto" unmountOnExit>
      <Paper sx={{ maxHeight: "305px", display: "flex", width: 240, position:"fixed", alignSelf:"center", left:"50%", marginLeft:"-120px", overflowY:"scroll", scrollbarColor:"ambar1",}}>
      <List sx={{ width: 240, alignItems: "center"  }}>

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
            
            <ListItemButton component="a" href="/allCategories" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClearAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Todas" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton component="a" href="/adminCategories" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ModeEditIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar" />
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
            
            <ListItemButton component="a" href="/allProducts" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClearAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton component="a" href="/adminProducts" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ModeEditIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar" />
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

          <ListItemButton component="a" href="/allDiscounts" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClearAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton component="a" href="/adminDiscounts" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ModeEditIcon />
              </ListItemIcon>
              <ListItemText primary="Administrar" />
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

        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>

      </List>
      </Paper>
      </Collapse>
    </HiddensmUp>
    
  );
}

export default (AdminMenuMobile);