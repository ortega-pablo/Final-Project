import { Box, Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSubCategory, getSubCategories, putNameSubcategoria } from "../../../redux/actions";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";

export const UpadateSubCat = ({ allSubCategories , idSubCat, updatingSubCat, setUpdatingSubCat,allCategory , category, newCategoryName}) => {
   const dispatch = useDispatch()
   const [updating, setUpdating] = useState(false);
  const [idSubCatForUpd, setIdSubCatForUpd] = useState(0)
console.log(updating)
   

let comprobacionName = [];
const allCategoriesMod = allCategory?.filter((c) => c.id === category);
const comprobarNombre = allCategoriesMod[0]?.subCategories?.filter(
  (subC) => subC?.name === newCategoryName
);
comprobacionName = comprobarNombre?.map((s) => s.name) || ["", ""];
// console.log(comprobacionName)


  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
     .notOneOf(   allCategoriesMod[0]?.subCategories?.map((subC) => subC?.name )|| ["", ""]  ,"Ya existe esa sub categoría en la categoria a la que pertenece")
      .required(
        "El nombre es requerido"
      ),

    description: yup
      .string("Ingrese el nombre de la nueva categoria"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm} ) => {
      alert(JSON.stringify(values, null, 2));
      await dispatch(putNameSubcategoria(idSubCat, values))
      await dispatch(getSubCategories())
    
      resetForm({values:""})
      // setUpdating(false);
    },
  });


   




 async function handleDeleteSubCat(e){
      e.preventDefault()
    await    dispatch(deleteSubCategory(e.target.value))
    await   dispatch(getSubCategories())

  }

  async function handleUpdateSubCat(e){
    e.preventDefault()
    setUpdating(!updating)
    setIdSubCatForUpd(e.target.value)
    console.log("holaaa")

  }

  return (
    <>
      <div>Actualizar sub categorias</div>
      {/* {allSubCategories?.map( sc => {
          return (
                  <TableRow>
        <TableCell>{sc.name}</TableCell>
        <TableCell>{sc.description}</TableCell>
        <TableCell>{sc.categories[0].name}</TableCell>
        <Button
          value={sc.id}
         onClick={(e) => handleUpdateSubCat(e)}
          name="delete"
        //   startIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Button
          value={sc.id}
          onClick={(e) => handleDeleteSubCat(e)}
          name="delete"
        //   startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
      </TableRow> 
          )
      }  )
      }
      */}


     {updatingSubCat && (
        <>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            // onChange={(e) => handleInput(e)}
            //  onSubmit={(e) => handleSubmit(e)}
            onSubmit={formik.handleSubmit}
          >
            {/* <h3> Editando a: {categoryToUpdate.name}</h3> */}
            <TextField
              id="outlined-basic"
              label="Nuevo valor del nombre"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              id="outlined-basic"
              label="Nuevo valor de la descripción"
              variant="outlined"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Button
              type="submit"
                       
            >
              Confirmar edición
            </Button>
            <Button
                type="click"
              onClick={ (e)=>  setUpdatingSubCat(false)}
               
              >
                Cancelar edición
              </Button>
            
          </Box>
        </>
      )}

    </>
  );
};
