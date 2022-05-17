import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Box, ListItemButton, FormControl, Input, FormHelperText, TextField, ListItem, Button } from '@mui/material';
import { ListItemIcon, ListSubheader } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions';
import { withWidth } from '@material-ui/core';
import { Hidden } from '@material-ui/core';

function validate (value) {
  let errors = {};
  if(isNaN(value.Desde)) errors.Desde = "Por favor ingrese un número."
  if(isNaN(value.Hasta)) errors.Hasta = "Por favor ingrese un número."
  if(value.Desde > value.Hasta) errors.Desde = "El primero valor debe ser menor."
  return errors;
}



function Category({handleClickForCategories, handleClickForSubcategories, handleClickSubmitPerPrice}) {

  const categories = useSelector(state => state.categories);

  let [errors, setErrors] = React.useState({});

  let [reRender, setRerender] = React.useState('');

  const [errorDesde, setErrorDesde] = React.useState(false)
  const [leyendaErrorDesde, setLeyendaErrorDesde] = React.useState("")

  const [errorHasta, setErrorHasta] = React.useState(false)
  const [leyendaErrorHasta, setLeyendaErrorHasta] = React.useState("")

  const dispatch = useDispatch();

  function handleClick (e){
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
    <Hidden xsDown>
      <Box>

        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Categorias
            </ListSubheader>
          }
        >
        {categories.length ?  categories.map((category) => {
          return <>
          <ListItemButton
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
        </>}) : 
        <></>
        }

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
                handleClick(e);
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
        </Box>
    </Hidden>
    
  );
}

export default withWidth()(Category);

        

        