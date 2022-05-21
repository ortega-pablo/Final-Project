import React, {useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, Input} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { verifyToken } from '../../redux/actions';

import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(Input)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export const NavBar = (props) => {
  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const dispatch = useDispatch() 

  const ls = JSON.parse(localStorage.getItem('token'))
  //console.log('soy el token que estas despachando  => ', ls?.token)

  useEffect(()=>{
    dispatch(verifyToken(123))
  },[dispatch])


  const handleChangeForName = (e) => {
    setName(e.target.value)
  }

  const isMenuProfileOpen = Boolean(anchorProfileEl)
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



  const menuProfileId = 'primary-search-account-menu';
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuProfileId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuProfileOpen}
      onClose={handleMenuProfileClose}
    >
     {
       
       //userStatus === user 
       ls?.token?
       <>
      <MenuItem onClick={handleMenuProfileClose} >
          <Link sx={{textDecoration:'none',  color:'inherit'}} href='/profile/asd'>
            Perfil
          </Link>
      </MenuItem>
      <MenuItem onClick={() => window.localStorage.clear()}>
        <Link sx={{textDecoration:'none',  color:'inherit'}} href='/'>
          Desloguear
        </Link>
      </MenuItem>
       </>
      :
      //userStatus === '' 
      <>
      <MenuItem onClick={handleMenuProfileClose}>
        <Link sx={{textDecoration:'none',  color:'inherit'}} href='/login'>
          Login
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuProfileClose}>
        <Link sx={{textDecoration:'none',  color:'inherit'}} href='/createaccount'>
          Crear cuenta
        </Link>
      </MenuItem>
      </>
      // userStauts === 'admin'
      // menu item que muestre link panel de control
     }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="error">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge color="error">
            <InfoIcon />
          </Badge>
        </IconButton>
        <p>About Us</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box  sx={{ flexGrow: 1}} >
       
       <AppBar sx={{backgroundColor: "#494545", color: "#E8E9F2", position: "fixed" } }  >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
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
              display: { xs: 'none', sm: 'block' },
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif;',
              color: 'inherit',
              textDecoration: 'none',
              margin: '5px'
            }}
          >
            NombreShop
          </Typography>
          <form onSubmit={(e) => {
            navigate(`/home/${name}`)            
            }}
            
            >
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChangeForName}
            />
          </Search>
          </form>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            <Box sx={{margin: '5px'}}>
              <Button
              variant='outlined'
                sx={{ my: 2, color: 'white', display: 'block', borderColor: '#E8E9F2'}}
                href="/#container"
              >
                Productos
              </Button>
            </Box>
            <Box sx={{margin: '5px'}}>
            <Button
              variant='outlined'
              href='/about'
              sx={{ my: 2, color: 'white', display: 'block', borderColor: '#E8E9F2', }}
            >
              Sobre nosotros
            </Button>
            </Box>

          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuProfileId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
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
}

