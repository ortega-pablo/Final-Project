import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  deleteSubCategory,
  getCategories,
  getSubCategories,
  putCategory,
} from "../../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCategory } from "../AddCategory";
import { UpadateSubCat } from "./UpadateSubCat";
import { AddSubCategoty } from "../AddSubCategoty";

export const AdminCatAndSubc = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const allSubCategories =useSelector((state) => state.subCategories);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories())
  }, [dispatch]);

    //updatin para categorias
  const [updating, setUpdating] = useState(false);
  //--------
  ///updatin para subcategorias
  const [updatingSubCat, setUpdatingSubCat] = useState(false);

  const [idCat, setIdCat] = useState(0);
  const [idSubCat, setIdSubCat] = useState(0)

  const categoryToUpdate = allCategories?.find((c) => c.id == idCat);




  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf( allCategories.map( c=> c.name)  ,"Ya existe esa  categoría")
      .required(
        "El nombre es requerido"
      ),

    description: yup.string("Ingrese el nombre de la nueva categoria"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm} ) => {
      alert(JSON.stringify(values, null, 2));

      await dispatch(putCategory(idCat, values));
      await dispatch(getCategories());
      resetForm({values:""})
      setUpdating(false);
    },
  });

  //------funciones para eliminar categoria
  async function handleDeleteCat(e) {
    e.preventDefault();
    console.log(e.target.value);
    await dispatch(deleteCategory(e.target.value));
    await dispatch(getCategories());
  }

  //------ funciones para editar categorias

  async function handleUpdateCat(e) {
    e.preventDefault();
    setUpdating(true);
    setIdCat(e.target.value);
    console.log(idSubCat)
  }


  //funciones para eliminar sub categorias
    async function handleDeleteSubcateg(e){
    e.preventDefault()
  await dispatch(deleteSubCategory(e.target.value))
  await dispatch(getSubCategories())
   
  }

  function handleUpdateSubCat(e){
    e.preventDefault()
//id de la sub categoria a editar
setIdSubCat(e.target.value)
setUpdatingSubCat(!updatingSubCat)
  }

  return (
    <>
      <h2>Administracion de categorias y subcategorias</h2>

      <h3>Categorias existentes: {allCategories.length} </h3>
      {allCategories.map((c) => {
        return (
          <>
            <TableRow>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.description}</TableCell>

              <Button
                value={c.id}
                onClick={(e) => handleUpdateCat(e)}
                name="delete"
                startIcon={<EditIcon />}
              >
                Editar
              </Button>
              <Button
                value={c.id}
                onClick={(e) => handleDeleteCat(e)}
                name="delete"
                startIcon={<DeleteIcon />}
              >
                Eliminar
              </Button>
            </TableRow>
          </>
        );
      })}

      {updating && (
        <>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            // onChange={(e) => handleInput(e)}
            //  onSubmit={(e) => handleSubmit(e)}
            onSubmit={formik.handleSubmit}
          >
            <h3> Editando a: {categoryToUpdate.name}</h3>
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

            {updating && (
              <Button
                type="submit"
                onClick={ (e)=>  setUpdating(false)}
               
              >
                Cancelar edición
              </Button>
            )}
          </Box>
        </>
      )}

      <AddCategory
        allCategories={allCategories}/>


        <h3>Sub categorías existentes</h3>
       
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre de la subcategoria: </b></TableCell>
              <TableCell><b>Descripción: </b></TableCell>
              <TableCell><b>Categoria a la que pertenece: </b></TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {allSubCategories?.map((p) => {
              return (
                <TableRow>
                 

                  <TableCell>{p?.name}</TableCell>
                  <TableCell>{p?.description}</TableCell>
                  <TableCell>{p?.categories[0]?.name}</TableCell>
                  

                  <Button
                    value={p.id}
                    onClick={(e) => handleUpdateSubCat(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                  >
                    Editar subcategoría
                  </Button>
                  <Button
                    value={p.id}
                    onClick={(e) => handleDeleteSubcateg(e)}
                    // name="delete"
                    // startIcon={<EditIcon />}
                  >
                    Eliminar 
                  </Button>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>








        <AddSubCategoty
          allCategories={allCategories}
          // handleUpdateSubCat={handleUpdateSubCat}//
          idSubCat={idSubCat}
          updatingSubCat={updatingSubCat}
          setUpdatingSubCat={setUpdatingSubCat}
        />
    </>
  );
};
