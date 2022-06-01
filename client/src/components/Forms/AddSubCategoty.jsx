import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, InputLabel, Select, MenuItem } from "@mui/material";
import { getCategories, getSubCategories, postAddSubCategory } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';

export const AddSubCategoty = ({ allCategories }) => {
  const allCategory = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const dispatch = useDispatch();

  let comprobacionName = [];
  const allCategoriesMod = allCategory?.filter((c) => c.id === category);
  const comprobarNombre = allCategoriesMod[0]?.subCategories?.filter(
    (subC) => subC?.name === newCategoryName
  );
  comprobacionName = comprobarNombre?.map((s) => s.name) || ["", ""];

// console.log(category)
// if(!category) {
//   allCategories.map( p=> p.name)
// }

  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .max(50, "La cantidad maxima de caracteres para el nombre de una sub categoría es 50")
      .required("El nombre es requerido")
      .notOneOf(
       comprobacionName.map((p) => p)  ,
        "Ya existe esa sub categoria en la categoría seleccionada "
      ),
      

    description: yup
      .string("Ingrese la descripción")
      .max(100, "La cantidad maxima de caracteres es 100")

      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
     
   
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      
    if(category){
      await dispatch(postAddSubCategory(category, values));
      await dispatch(getCategories());
      await dispatch(getSubCategories())
      Swal.fire({
        background: '#DFDCD3',
        icon: 'success',
        title: 'Creada',
        showConfirmButton: false,
        timer: 1500
      })
      resetForm({values:""})
    }else {
      Swal.fire({
        background: '#DFDCD3',
        confirmButtonColor: '#B6893E',
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione una categoria'
      })

    }


    },
  });

  function handleInputNewSubCat(e) {
    e.preventDefault();
    setNewCategoryName(e.target.value);
  }

 

  function handleChangeSelect(e) {
    e.preventDefault();
    setCategory(e.target.value);

  }

  return (
    <Box sx={{display:'flex', }}>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onChange={handleInputNewSubCat}
        // onChange={handleInput}
        onSubmit={formik.handleSubmit}
        sx={{display:'flex', alignItems:'center'}}
      >
        <TextField
          id="outlined-basic"
          label="Nombre de la nueva sub categoría"
          variant="outlined"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{m:3}}
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
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
              <InputLabel id="demo-simple-select-standard-label" sx={{m:3}}>
        Agregar Sub categoria a:
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
        onChange={handleChangeSelect}
        label="Age"
        type="click"
        name="select"
        sx={{m:3}}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {allCategories?.map((cat) => {
          return (
            <MenuItem value={cat.id}>
              {cat.name}
            </MenuItem>
          );
        })}
      </Select>
      </InputLabel>
        <Button type="submit" variant='contained' color="ambar3">Crear</Button>
       
      </Box>
    </Box>
  );
};
