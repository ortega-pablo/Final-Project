import { Button, TableCell, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  putCategory,
} from "../../../redux/actions";
import { useFormik } from "formik";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const AdminCatAndSubc = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [updating, setUpdating] = useState(false);
  const [idCat, setIdCat] = useState(0);

  const categoryToUpdate = allCategories?.find((c) => c.id == idCat);
  console.log(categoryToUpdate);
  console.log(idCat);
  console.log(categoryToUpdate?.description);
  console.log(categoryToUpdate?.name);

  const validationSchema = yup.object({
    name: yup
      .number("El stock es numerico")
      .required(
        "El stock es requerido si es que lo deseas agregar.Luego tambien lo podrás hacer desde el panel de administrador"
      )
      .positive("El stock debe ser positivo"),

    description: yup.string("asd"),
  });

if(categoryToUpdate){

  
}

  const formik = useFormik({
    initialValues: {
      id: idCat,
      name: categoryToUpdate?.name ,
      description: categoryToUpdate?.description ,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      
      alert(JSON.stringify(values, null, 2));
      console.log(values);
      await dispatch(putCategory(idCat, values));
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
    setUpdating(!updating);
    setIdCat(e.target.value);
  }
  return (
    <>
      <h2>Administracion de categorias y subcategorias</h2>
      {allCategories.map((c) => {
        return (
          <>
            <TableRow>
              <TableCell>
                <b>Categoría a modificar:</b>
              </TableCell>
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
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button
            type="submit"
            //  value={c.id}

            name="delete"
            // startIcon={<EditIcon />}
          >
            Confirmar edición
          </Button>
        </>
      )}
    </>
  );
};
