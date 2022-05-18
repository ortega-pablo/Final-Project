import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, InputLabel, Select, MenuItem } from "@mui/material";
import { getCategories, postAddSubCategory } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import { validate } from "./validacionInputNewSubCat/validate";

export const AddSubCategoty = ({ allCategories }) => {
  const allCategory = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });

  const [selecCat , setSelecCat] = useState(false)

  const [errorName, setErrorName] = useState(false);
  const [leyendaErrorName, setLeyendaErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [leyendaErrorDescription, setLeyendaErrorDescription] = useState("");
  const [errorThumbnail, setErrorThumbnailn] = useState(false);
  const [leyendaErrorThumbnail, setLeyendaErrorThumbnail] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    if (!errors.name) {
      setErrorName(false);
      setLeyendaErrorName("");
    }

    if (!errors.description) {
      setErrorDescription(false);
      setLeyendaErrorDescription("");
    }
  }

  async function handleNewSubCat(e) {
    e.preventDefault();

    if(selecCat){
        
   

    //validacion de nombre existente en la categoria en cuestion
    const allCategoriesMod = allCategory.filter((c) => c.id === category);

    const comprobarNombre = allCategoriesMod[0]?.subCategories.filter(
      (subC) => subC.name === input.name
    );

    if (comprobarNombre.length > 0) {
      setErrorName(true);
      setLeyendaErrorName("Esa subCategoría ya existe para ésta categoría");
    }

    if (errors?.name) {
      setErrorName(true);
      setLeyendaErrorName(errors?.name);
    }

    if (errors?.description) {
      setErrorDescription(true);
      setLeyendaErrorDescription(errors?.description);
    }

    if (!input.name) {
      e.preventDefault();
      setErrorName(true);
      setLeyendaErrorName("El nombre es obligatorio");
    } else if (!input.description) {
      e.preventDefault();
      setErrorDescription(true);
      setLeyendaErrorDescription("La descripción es obligatoria");
    } else if (comprobarNombre.length === 0 || !input.name || !input.description) {
      await dispatch(postAddSubCategory(category, input));
      await dispatch(getCategories());
    }
}else{
    alert("Selecciona una categoria a modificar")
}
  }

  function handleChangeSelect(e) {
    e.preventDefault();
    setCategory(e.target.value);
   
    setSelecCat(true)
    
  }

  return (
    <>
      <div>AddSubCategoty</div>
      <InputLabel id="demo-simple-select-standard-label">
        Agregar categoria a:
      </InputLabel>

      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
        onChange={handleChangeSelect}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allCategories?.map((cat) => {
          return (
            <MenuItem value={cat.id}>
              {cat.name} {cat.id}
            </MenuItem>
          );
        })}
      </Select>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        //  onChange={handleInputNewSubCat}
        onChange={handleInput}
      >
        <TextField
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          name="name"
          helperText={leyendaErrorName}
          error={errorName}
        />
        <TextField
          id="outlined-basic"
          label="Descripcion"
          variant="outlined"
          name="description"
          helperText={leyendaErrorDescription}
          error={errorDescription}
        />
        <TextField
          id="outlined-basic"
          label="Imagen miniatura"
          variant="outlined"
          name="thumbnail"
          helperText={leyendaErrorThumbnail}
          error={errorThumbnail}
        />
        <Button onClick={handleNewSubCat}>Crear nueva Sub Categoria</Button>
      </Box>
    </>
  );
};
