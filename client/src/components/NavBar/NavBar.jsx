import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Button,
  Link,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartById, verifyToken } from "../../redux/actions";
import Swal from 'sweetalert2';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(Input)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const NavBar = (props) => {
  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.userStatus);
  const cartStatus = useSelector((state) => state.cart)
  

  const ls = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    dispatch(verifyToken(ls?.token));
    dispatch(getCartById(ls?.token));
    dispatch(getCartById(ls?.token));
  }, [dispatch]);

  const handleChangeForName = (e) => {
    setName(e.target.value);
  };

  const isMenuProfileOpen = Boolean(anchorProfileEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuProfileClose = () => {
    setAnchorProfileEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAlertCart = () => {
    Swal.fire({
      title: 'Logeate',
      text: "Debes estar logeado para ver tu carrito",
      icon: 'warning',
      background: '#DFDCD3',
      showCancelButton: true,
      confirmButtonColor: '#B6893E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok, ir al login',
      cancelButtonText: 'cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login')
      }
    })
  }


  const menuProfileId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuProfileId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuProfileOpen}
      onClose={handleMenuProfileClose}
    >
      {
        //userStatus === user
        userStatus === "user" ? (
          <>
            <Link sx={{ textDecoration: "none" }} href="/profile/asd">
              <MenuItem onClick={handleMenuProfileClose}>
                <Typography variant="body1" color="ambar5.main">
                  Perfil
                </Typography>
              </MenuItem>
            </Link>

            <Link sx={{ textDecoration: "none" }} href="/">
              <MenuItem onClick={() => window.localStorage.removeItem("token")}>
                <Typography variant="body1" color="ambar5.main">
                  LogOut
                </Typography>
              </MenuItem>
            </Link>
          </>
        ) : userStatus === "admin" || userStatus === "superAdmin" ? (
          <>
            <Link sx={{ textDecoration: "none" }} href="/profile/asd">
              <MenuItem onClick={handleMenuProfileClose}>
                <Typography variant="body1" color="ambar5.main">
                  Perfil
                </Typography>
              </MenuItem>
            </Link>

            <Link sx={{ textDecoration: "none" }} href="/AdminPanel">
              <MenuItem onClick={handleMenuProfileClose}>
                <Typography variant="body1" color="ambar5.main">
                  Panel
                </Typography>
              </MenuItem>
            </Link>

            <Link sx={{ textDecoration: "none" }} href="/">
              <MenuItem onClick={() => window.localStorage.removeItem("token")}>
                <Typography variant="body1" color="ambar5.main">
                  LogOut
                </Typography>
              </MenuItem>
            </Link>
          </>
        ) : (
          <></>
        )
      }
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link sx={{ textDecoration: "none" }} href="/">
        <MenuItem>
          <IconButton size="large" color="ambar5">
            <Badge color="error">
              <HomeIcon />
            </Badge>
          </IconButton>
          <Typography variant="body1" color="ambar5.main">
            Home
          </Typography>
        </MenuItem>
      </Link>

      {userStatus !== null ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="ambar5"
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="body1" color="ambar5">
            Profile
          </Typography>
        </MenuItem>
      ) : (
        <>
          <Link sx={{ textDecoration: "none" }} href='/createaccount'>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="ambar5"
              >
                <AccountCircle />
              </IconButton>
              <Typography variant="body1" color="ambar5.main">
                Crear cuenta
              </Typography>
            </MenuItem>
          </Link>
          <Link sx={{ textDecoration: "none" }} href='login'>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="ambar5"
              >
                <AccountCircle />
              </IconButton>
              <Typography variant="body1" color="ambar5.main">
                Login
              </Typography>
            </MenuItem>
          </Link>
        </>
      )}

      <MenuItem>
        <IconButton size="large" color="ambar5">
          <Badge color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Typography variant="body1" color="ambar5">
          Cart
        </Typography>
      </MenuItem>

      <Link sx={{ textDecoration: "none" }} href="/about">
        <MenuItem>
          <IconButton size="large" color="ambar5">
            <Badge color="error">
              <InfoIcon />
            </Badge>
          </IconButton>
          <Typography variant="body1" color="ambar5.main">
            About Us
          </Typography>
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "ambar6.main",
          color: "ambar1.main",
          position: "fixed",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="ambar1.main"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            LOGO
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "block" },
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif;',
              color: "ambar1.main",
              textDecoration: "none",
              margin: "5px",
            }}
          >
            EXMINE
          </Typography>
          <form
            onSubmit={(e) => {
              navigate(`/home/${name}`);
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon color="ambar1" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChangeForName}
              />
            </Search>
          </form>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box sx={{ margin: "5px" }}>
              <Button
                variant="outlined"
                sx={{
                  my: 2,
                  color: "ambar1.main",
                  display: "block",
                  borderColor: "ambar1.main",
                }}
                href="/#container"
              >
                Productos
              </Button>
            </Box>
            <Box sx={{ margin: "5px" }}>
              <Button
                variant="outlined"
                href="/about"
                sx={{
                  my: 2,
                  color: "ambar1.main",
                  display: "block",
                  borderColor: "ambar1.main",
                }}
              >
                Sobre nosotros
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex"}}}>
          {
            userStatus !== null ? (
              <IconButton size="large" color="ambar1" sx={{mr: 1}} href="/cart">
                <Badge badgeContent={cartStatus?.products?.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            ) : 
            (
              <IconButton size="large" color="ambar1" sx={{mr: 1}} onClick={handleAlertCart}>
                <Badge  color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )
          }
            {userStatus !== null ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuProfileId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="ambar1"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <></>
            )}

            {userStatus === null ? (
              <>
                <Box sx={{ margin: "5px" }}>
                  <Button
                    variant="outlined"
                    href="/login"
                    sx={{
                      my: 2,
                      color: "ambar1.main",
                      display: "block",
                      borderColor: "ambar1.main",
                    }}
                  >
                    LogIn
                  </Button>
                </Box>
                <Box sx={{ margin: "5px" }}>
                  <Button
                    variant="outlined"
                    href="/createaccount"
                    sx={{
                      my: 2,
                      color: "ambar1.main",
                      display: "block",
                      borderColor: "ambar1.main",
                    }}
                  >
                    Crear cuenta
                  </Button>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="ambar1"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar></Toolbar>
      {renderMobileMenu}
      {renderProfileMenu}
    </Box>
  );
};
