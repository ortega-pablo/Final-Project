import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Box, ListItemButton, FormControl, Input, FormHelperText, TextField, ListItem, Button, Container, Collapse } from '@mui/material';
import { ListItemIcon, ListSubheader } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions';
import { withWidth } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
 


function validate (value) {
  let errors = {};
  if(isNaN(value.Desde)) errors.Desde = "Por favor ingrese un número."
  if(isNaN(value.Hasta)) errors.Hasta = "Por favor ingrese un número."
  if(value.Desde > value.Hasta) errors.Desde = "El primero valor debe ser menor."
  return errors;
}



function SwipeableFilters({handleClickForCategories, handleClickForSubcategories, handleClickSubmitPerPrice}) {

  let categories = useSelector(state => state.categories);


  let [errors, setErrors] = React.useState({});

  let [reRender, setRerender] = React.useState('');

  const [errorDesde, setErrorDesde] = React.useState(false)
  const [leyendaErrorDesde, setLeyendaErrorDesde] = React.useState("")

  const [errorHasta, setErrorHasta] = React.useState(false)
  const [leyendaErrorHasta, setLeyendaErrorHasta] = React.useState("")

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  function handleClickError (e){
    e.preventDefault();
    if(errors.Desde){
      setErrorDesde(true);
      setLeyendaErrorDesde(errors?.Desde)
    }
    if(errors.Hasta){
      setErrorHasta(true);
      setLeyendaErrorHasta(errors?.Hasta)
    }
  }

  useEffect(()=> {
    dispatch(getCategories());
  }, [dispatch]);

  const [value, setValue] = React.useState({
    Desde:null, 
    Hasta:null
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...value,
      [e.target.name]: e.target.value
    }))

    if(!errors.Desde){
      setErrorDesde(false);
      setLeyendaErrorDesde("")
    }
    if(!errors.Hasta){
      setErrorHasta(false);
      setLeyendaErrorHasta("")
    }
  }

  return (
  <Box sx={{ display: { xs: "block", sm: "none" } }}> 
      <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Filtros" />
            {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{width: '100%', bgcolor: 'background.paper', display: "block"}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader sx={{display: "block"}} component="div" id="nested-list-subheader">
              Categorias
            </ListSubheader>
          }
        >
        <Container sx={{width: "100%", display:"flex", justifyContent: "space-around"}}>
        {
   
          
          categories.length ?  categories.map((category) => {
          return  <Box sx={{display: "inline-flex", flexDirection: "column"}}>
                          <ListItemButton
                            sx={{display:"inline"}}
                            key={category}
                            onClick={() => handleClickForCategories(category.name)}
                            disableGutters
                            >
                            <ListItemText primary={category.name}  />
                            </ListItemButton>
                              {category.subCategories ? category.subCategories.map(subCategory => {
                                return <>
                            <List component="div" disablePadding>
                                      <ListItemButton 
                                        key={subCategory} 
                                        sx={{ pl: 3 }}
                                        onClick={() => handleClickForSubcategories(subCategory.name)}
                                      >
                                          <ListItemText primary={subCategory.name}/>
                                      </ListItemButton>
                              </List>
                        </>
                      }) : <></>}
                </Box>
        }) : 
        <></>
        }
        </Container>

        </List>
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Precio
            </ListSubheader>
          }>
            <ListItemButton onClick={() => {
              handleClickSubmitPerPrice({Desde: 0, Hasta: 100000});
              }}>
            <ListItemText primary={"Hasta $100.000"}  />
            </ListItemButton>
            <ListItemButton onClick={() => {
              handleClickSubmitPerPrice({Desde: 100000, Hasta: 200000});
            }}>
            <ListItemText primary={"$100.000 - $200.000"}  />
            </ListItemButton>
            <ListItemButton onClick={() => {
              handleClickSubmitPerPrice({Desde: 200000, Hasta: 1000000});
              }}>
            <ListItemText primary={"Mas de $200.000"}  />
            </ListItemButton>
            <ListItem>
              <Box  >
                <TextField 
                value={value.Desde} 
                name="Desde"
                onChange={handleChange} 
                placeholder='Desde'
                helperText={leyendaErrorDesde}
                error={errorDesde} 
                /> 
                <TextField
                  value={value.Hasta}
                  name="Hasta"
                  onChange={handleChange}
                  placeholder='Hasta'
                  helperText={leyendaErrorHasta}
                  error={errorHasta} 
                />                               
              <Button onClick={(e) => {
                handleClickError(e);
                if(errors.Desde || errors.Hasta){
                  e.preventDefault();
                  alert("Existen errores.");
                }else{
                  handleClickSubmitPerPrice(value);
                }
                }}>
                Filtrar
              </Button>
              </Box>
            </ListItem>
        </List>
        </Collapse>
    </Box>
    
  );
}

export default SwipeableFilters;

// const [bottonFilters, setState] = React.useState({top: false});

// const toggleDrawer = (anchor, open) => (event) => {
//   if (
//     event &&
//     event.type === 'keydown' &&
//     (event.key === 'Tab' || event.key === 'Shift')
//   ) {
//     return;
//   }

//   setState({ ...bottonFilters, [anchor]: open });
// };
// const list = () => (
//     <Box
//         sx={{ width: "100%" }}
//         role="presentation"
//     >
//         <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
//         component="nav"
//         aria-labelledby="nested-list-subheader"
//         subheader={
//             <ListSubheader component="div" id="nested-list-subheader">
//             Categorias
//             </ListSubheader>
//         }
//         >
//         {categories.length ?  categories.map((category) => {
//         return <>
//         <ListItemButton
//             key={category}
//             onClick={() => handleClickForCategories(category.name)}
//             disableGutters
//             >
//             <ListItemText primary={category.name}  />
//             </ListItemButton>
//             {category.subCategories ? category.subCategories.map(subCategory => {
//                 return <>
//             <List component="div" disablePadding>
//                     <ListItemButton 
//                         key={subCategory} 
//                         sx={{ pl: 3 }}
//                         onClick={() => handleClickForSubcategories(subCategory.name)}
//                     >
//                         <ListItemText primary={subCategory.name}/>
//                     </ListItemButton>
//             </List>
//                 </>
//             }) : <></>}
//         </>}) : 
//         <></>
//         }

//         </List>
//     </Box>

// )
