import { Box, Button, Paper, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  getSubCategories,
  putCategory,
} from "../../../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCategory } from "../../../Forms/AddCategory";
import { AddSubCategoty } from "../../../Forms/AddSubCategoty";
import Swal from 'sweetalert2';

const CreateCategoryToAdmin = () => {
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
      .max(200, "El maximo de caracteres es 200")  
      .notOneOf( allCategories.map( c=> c.name)  ,"La categoría ya existe")
      .required(
        "Por favor ingrese el nombre"
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
      Swal.fire({
        background: '#DFDCD3',
        icon: 'Creada',
        title: 'Logeado',
        showConfirmButton: false,
        timer: 1500
      })

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
    <Paper sx={{display:"flex", flexDirection:"column", alignItems:"center", p:2}}>
      <Typography sx={{mt:2}} variant='h6' color='darkGrey.main'>Categorias existentes: {allCategories.length} </Typography>
      <AddCategory
        allCategories={allCategories}/>
        <Typography variant='h6' color='darkGrey.main'>Nueva subcategoria</Typography>
        <AddSubCategoty
          allCategories={allCategories}
        />
    </Paper>
  );
};

export default CreateCategoryToAdmin