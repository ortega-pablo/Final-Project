import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterUsers, filterUsersAll, orderUsers } from "../../../redux/actions";
import { Box, Drawer, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Collapse, Paper } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/material/styles";
import FilterListIcon from '@mui/icons-material/FilterList';

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function UsersFilters({order, setOrder}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  async function handleOrderIdAsc(e) {
    await dispatch(orderUsers("asc" ));
    setOrder("asc");    
  }

  async function handleOrderIdDesc(e) {
    await dispatch(orderUsers("desc"));
    setOrder("desc");
  }

  async function handleOrderUserNameAtoZ(e) {
    await dispatch(orderUsers("AtoZ"));
    setOrder("AtoZ");
  }

  async function handleOrderUserNameZtoA(e) {
    await dispatch(orderUsers("ZtoA"));
    setOrder("ZtoA");
  }

  async function handleFilterUser(e) {
    await dispatch(filterUsers("user"));
    setOrder("user");
  }

  async function handleFilterAdmin(e) {
    await dispatch(filterUsers("admin"));
    setOrder("admin");
  }
  async function handleFilterAll(e) {
    await dispatch(filterUsersAll());
    setOrder("all");
  }

  return (
    <Box sx={{ display: "flex", position:"absolute", top:"13.5%", left:"93%"}}>
      <Button
        size="small"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{...(open && { display: "none" }) }}
      >
        <IconButton>
        <FilterListIcon fontSize="large" color="ambar2" sx={{border:"2px solid", borderRadius:"50%", backgroundColor:"background.paper"}} />
        </IconButton>
      </Button>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>

        <Divider variant="middle" />
        <ListItem>
          <ListItemButton onClick={handleClick1}>
            <ListItemText primary="Id de usuario" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleOrderIdAsc(e)} sx={{ pl: 4 }} >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Ascendente" />
          </ListItemButton>

          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleOrderIdDesc(e)} sx={{ pl: 4 }} >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Descendente" />
          </ListItemButton>

          <Divider variant="middle" />
        </Collapse>

        <ListItem>
          <ListItemButton onClick={handleClick2}>
            <ListItemText primary="Nombre de usuario" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleOrderUserNameAtoZ(e)} sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="A a Z" />
          </ListItemButton>

          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleOrderUserNameZtoA(e)} sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Z a A" />
          </ListItemButton>

          <Divider variant="middle" />
        </Collapse>

        <ListItem>
          <ListItemButton onClick={handleClick3}>
            <ListItemText primary="Tipo de usuario" />
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleFilterUser(e)} sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Usuario" />
          </ListItemButton>

          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleFilterAdmin(e)} sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Administrador" />
          </ListItemButton>

          <Divider variant="middle" />

          <ListItemButton onClick={(e)=>handleFilterAll(e)} sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Todos" />
          </ListItemButton>

          <Divider variant="middle" />
        </Collapse>
      </Drawer>
    </Box>
  );
}

export default UsersFilters;
