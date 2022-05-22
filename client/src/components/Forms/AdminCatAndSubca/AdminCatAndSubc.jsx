import { Box, Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
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

  const [updating, setUpdating] = useState(false);
  const [idCat, setIdCat] = useState(0);

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

  //------ funciones para editar

  async function handleUpdateCat(e) {
    e.preventDefault();
    setUpdating(true);
    setIdCat(e.target.value);
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
        <UpadateSubCat
        allSubCategories={allSubCategories}/>
        <AddSubCategoty
          allCategories={allCategories}
        />
    </>
  );
};
