import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, InputLabel, Select, MenuItem } from "@mui/material";
import { getCategories, postAddSubCategory } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import { validate } from "./validacionInputNewSubCat/validate";
import { useFormik } from "formik";
import * as yup from "yup";


export const AddSubCategoty = ({ allCategories }) => {
  const allCategory = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [newCategoryName, setNewCategoryName ] = useState("")

  
 // validacion de nombre existente en la categoria en cuestion
    // const allCategoriesMod = allCategory.filter((c) => c.id === category);

    // const comprobarNombre = allCategoriesMod[0]?.subCategories.filter(
    //   (subC) => subC.name === input.name
    // );

//     if (comprobarNombre.length > 0) {
//       setErrorName(true);
//       setLeyendaErrorName("Esa subCategoría ya existe para ésta categoría");
//     }
// let comprobacionName = ["", ""]
let comprobacionName = []
const allCategoriesMod = allCategory?.filter((c) => c.id === category);
const comprobarNombre = allCategoriesMod[0]?.subCategories?.filter( (subC) => subC?.name === newCategoryName )
 comprobacionName = comprobarNombre?.map( s => s.name) || ["", ""]



 
  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .required("El nombre es requerido")
      .notOneOf(comprobacionName.map( p => p) ,  "Ya existe esa subcategoría en la categoria seleccionada" ),
     
    description: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
  });
 
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      await dispatch(postAddSubCategory(category, values));
      await dispatch(getCategories());
    },
  });

  




function handleInputNewSubCat(e){
  e.preventDefault()
  setNewCategoryName(e.target.value)
 
}
  
  const dispatch = useDispatch();
  
  

 

  
  
// }
//   }

   function handleChangeSelect(e) {
    e.preventDefault();
    setCategory(e.target.value);

   
    // setSelecCat(true)
    
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
        type="click"
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
         onChange={handleInputNewSubCat}
        // onChange={handleInput}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Nombre"
          variant="outlined"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="outlined-basic"
          label="Descripcion"
          variant="outlined"
          name="description"
          // helperText={leyendaErrorDescription}
          // error={errorDescription}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        {/* <TextField
          id="outlined-basic"
          label="Imagen miniatura"
          variant="outlined"
          name="thumbnail"
          helperText={leyendaErrorThumbnail}
          error={errorThumbnail}
        /> */}
        <Button type="submit">Crear nueva Sub Categoria</Button>
      </Box>
    </>
  );
};
