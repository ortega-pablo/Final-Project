import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, InputLabel, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { deleteSubCategory, getCategories, getSubCategories, postAddSubCategory } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { UpadateSubCat } from "./AdminCatAndSubca/UpadateSubCat";



//TAMBIEN EDITAMOS SUBCATEGORIAS EXISTENTES//
export const AddSubCategoty = ({ allCategories, handleUpdateSubCat, idSubCat, updatingSubCat, setUpdatingSubCat }) => {
  const allCategory = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const dispatch = useDispatch();
  const allSubCategories = useSelector(state=> state.subCategories)

  let comprobacionName = [];
  const allCategoriesMod = allCategory?.filter((c) => c.id === category);
  const comprobarNombre = allCategoriesMod[0]?.subCategories?.map((subC) => subC.name );
  comprobacionName = comprobarNombre?.map((s) => s.name) || ["", ""];
console.log(allCategoriesMod)
console.log(newCategoryName)
console.log(comprobarNombre)
// console.log(category)
// if(!category) {
//   allCategories.map( p=> p.name)
// }

  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva  categoria")
      .required("El nombre es requerido")
      .notOneOf(
        allCategoriesMod[0]?.subCategories?.map((subC) => subC?.name )|| ["", ""]   ,
        "Ya existe esa sub categoria en la categoría seleccionada "
      ),
      

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
    onSubmit: async (values, {resetForm}) => {
      
      console.log(category) 
    if(category){
      await dispatch(postAddSubCategory(category, values));
      await dispatch(getCategories());
      await dispatch(getSubCategories())
      resetForm({values:""})
    }else { 
      alert("seleccione una categoria")
      return
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

  // async function handleDeleteSubcateg(e){
  //   e.preventDefault()
  // await dispatch(deleteSubCategory(e.target.value))
  // await dispatch(getSubCategories())
   
  // }

  // function handleUpdateSubCat(e){
  //   e.preventDefault()

  // }



   

  return (
    <>
      <div>AddSubCategoty to product</div>

    





      <InputLabel id="demo-simple-select-standard-label">
        Agregar Sub categoria a:
      </InputLabel>

      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={category}
        onChange={handleChangeSelect}
        label="Age"
        type="click"
        name="select"
        

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
          label="Nombre de la nueva sub categoría"
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
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
     
        <Button type="submit">Crear nueva Sub Categoria</Button>
       
      </Box>

      <UpadateSubCat
      idSubCat={idSubCat} // ID DE LA SUBCAT Q VAMOS A EDITAR
      updatingSubCat={updatingSubCat}
      setUpdatingSubCat={setUpdatingSubCat}
      allCategory={allCategory}
      category={category}
      newCategoryName={newCategoryName}
        // allSubCategories={allSubCategories}
        />
    </>
  );
};
