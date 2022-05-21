import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  ListItemButton,
  TextField,
  ListItem,
  Button,
  List,
  ListSubheader,
  ListItemText,
  Paper,
} from "@mui/material";
import { HiddenxsDown } from "../../personalizadTheme";
import { getCategories } from "../../redux/actions";

function validate(value) {
  let errors = {};
  if (isNaN(value.Desde)) errors.Desde = "Por favor ingrese un número.";
  if (isNaN(value.Hasta)) errors.Hasta = "Por favor ingrese un número.";
  if (value.Desde > value.Hasta)
    errors.Desde = "El primero valor debe ser menor.";
  return errors;
}

function Category({
  handleClickForCategories,
  handleClickForSubcategories,
  handleClickSubmitPerPrice,
}) {
  const categories = useSelector((state) => state.categories);

  let [errors, setErrors] = React.useState({});

  let [reRender, setRerender] = React.useState("");

  const [errorDesde, setErrorDesde] = React.useState(false);
  const [leyendaErrorDesde, setLeyendaErrorDesde] = React.useState("");

  const [errorHasta, setErrorHasta] = React.useState(false);
  const [leyendaErrorHasta, setLeyendaErrorHasta] = React.useState("");

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    if (errors.Desde) {
      setErrorDesde(true);
      setLeyendaErrorDesde(errors?.Desde);
    }
    if (errors.Hasta) {
      setErrorHasta(true);
      setLeyendaErrorHasta(errors?.Hasta);
    }
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [value, setValue] = React.useState({
    Desde: null,
    Hasta: null,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...value,
        [e.target.name]: e.target.value,
      })
    );

    if (!errors.Desde) {
      setErrorDesde(false);
      setLeyendaErrorDesde("");
    }
    if (!errors.Hasta) {
      setErrorHasta(false);
      setLeyendaErrorHasta("");
    }
  };

  return (
    <HiddenxsDown sx={{ borderRadius: "10px" }}>
      <Paper sx={{ height: "100%", display: "flex"}}>
        <List sx={{ width: "90%", maxWidth: 360, alignItems: "center"  }}>
          <ListSubheader component="div" id="nested-list-subheader">
            Categorias
          </ListSubheader>
          {categories.length ? (
            categories.map((category) => {
              return (
                <>
                  <ListItemButton
                    key={category}
                    onClick={() => handleClickForCategories(category.name)}
                    
                  >
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                  {category.subCategories ? (
                    category.subCategories.map((subCategory) => {
                      return (
                        <>
                          <List component="div" disablePadding>
                            <ListItemButton key={subCategory} sx={{ pl: 6 }} onClick={() => handleClickForSubcategories(subCategory.name)}>
                              <ListItemText primary={subCategory.name} />
                            </ListItemButton>
                          </List>
                        </>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </>
              );
            })
          ) : (
            <></>
          )}

          <ListSubheader component="div" id="nested-list-subheader">
            Precio
          </ListSubheader>
          <ListItemButton
            onClick={() => {
              handleClickSubmitPerPrice({ Desde: 0, Hasta: 100000 });
            }}
          >
            <ListItemText primary={"Hasta $100.000"} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleClickSubmitPerPrice({ Desde: 100000, Hasta: 200000 });
            }}
          >
            <ListItemText primary={"$100.000 - $200.000"} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleClickSubmitPerPrice({ Desde: 200000, Hasta: 1000000 });
            }}
          >
            <ListItemText primary={"Mas de $200.000"} />
          </ListItemButton>
          <ListItem>
            <Box>
              <TextField
                value={value.Desde}
                name="Desde"
                onChange={handleChange}
                placeholder="Desde"
                helperText={leyendaErrorDesde}
                error={errorDesde}
              />
              <TextField
                value={value.Hasta}
                name="Hasta"
                onChange={handleChange}
                placeholder="Hasta"
                helperText={leyendaErrorHasta}
                error={errorHasta}
              />
              <Box m={2} sx={{ alignItems: "right" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={(e) => {
                    handleClick(e);
                    if (errors.Desde || errors.Hasta) {
                      e.preventDefault();
                      alert("Existen errores.");
                    } else {
                      handleClickSubmitPerPrice(value);
                    }
                  }}
                >
                  Filtrar
                </Button>
              </Box>
            </Box>
          </ListItem>
        </List>
      </Paper>
    </HiddenxsDown>
  );
}

export default Category;
