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
  Typography,
  Divider,
} from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { HiddenxsDown } from "../../personalizadTheme";
import { clearFilters, getCategories } from "../../redux/actions";
import Swal from "sweetalert2";

function validate(value) {
  let errors = {};
  if (isNaN(value.Desde)) errors.Desde = "Por favor ingrese un número.";
  if (isNaN(value.Hasta)) errors.Hasta = "Por favor ingrese un número.";
  if (value.Desde > value.Hasta) errors.Desde = "Este valor debe ser un mínimo";
  if (value.Hasta < value.Desde) errors.Hasta = "Este valor debe ser un maximo";
  if (value.Desde < 0) errors.Desde = "El valor debe ser mayor o igual a 0";
  if (value.Hasta < 0) errors.Hasta = "El valor debe ser mayor o igual a 0";
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

  const handleClearFilters = (e) => {
    dispatch(clearFilters());
  };

  return (
    <HiddenxsDown sx={{ borderRadius: "10px" }}>
      <Paper sx={{ height: "100%", display: "flex" }}>
        <List sx={{ width: 320, alignItems: "center" }}>
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="h5" m={2}>
              Categorias
            </Typography>
          </ListSubheader>
          {categories.length ? (
            categories.map((category) => {
              return (
                <>
                  <Divider variant="middle" />
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
                            <ListItemButton
                              key={subCategory}
                              sx={{ pl: 6 }}
                              onClick={() =>
                                handleClickForSubcategories(subCategory.name)
                              }
                            >
                              <HorizontalRuleIcon fontSize="small" />
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
          <Divider variant="middle" />
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="h5" m={2}>
              Precio
            </Typography>
          </ListSubheader>
          <Divider variant="middle" />
          <ListItemButton
            onClick={() => {
              handleClickSubmitPerPrice({ Desde: 0, Hasta: 999 });
            }}
          >
            <ListItemText primary={"Hasta $999"} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleClickSubmitPerPrice({ Desde: 1000, Hasta: 1999 });
            }}
          >
            <ListItemText primary={"$1.000 - $1.999"} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleClickSubmitPerPrice({ Desde: 2000, Hasta: 1000000 });
            }}
          >
            <ListItemText primary={"Mas de $2.000"} />
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
                sx={{ mt: "20px" }}
              />

              <Box
                mt={3}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="ambar3"
                  onClick={(e) => {
                    handleClick(e);
                    if (errors.Desde || errors.Hasta) {
                      e.preventDefault();
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Existen errores.",
                      });
                    } else {
                      handleClickSubmitPerPrice(value);

                    }
                  }}
                  sx={{ mr: 1 }}
                >
                  <Typography>Filtrar</Typography>
                </Button>
                <Button
                  variant="contained"
                  color="ambar3"
                  onClick={(e) => {
                    handleClearFilters();
                  }}
                >
                  <Typography>Limpiar filtros</Typography>
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
