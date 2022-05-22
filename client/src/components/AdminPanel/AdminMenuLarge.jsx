import React from "react";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SellIcon from '@mui/icons-material/Sell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { HiddenxsDown } from "../../personalizadTheme";



export default function AdminMenuLarge() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    <HiddenxsDown sx={{ borderRadius: "10px" }}>
      <Paper sx={{ height: "100%", display: "flex"}}>    
      <List sx={{ width: 240, alignItems: "center"  }}>
        <ListItemButton>
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
            
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClearAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Todas" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton sx={{ pl: 4 }}>
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
            
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClearAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton sx={{ pl: 4 }}>
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

          <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClearAllIcon/>
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItemButton>

            <Divider variant="middle" />

            <ListItemButton sx={{ pl: 4 }}>
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
    </HiddenxsDown>
  );
}
