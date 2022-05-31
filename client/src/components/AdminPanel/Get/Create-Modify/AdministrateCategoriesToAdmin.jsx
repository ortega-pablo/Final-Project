import {
  Box,
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { UpadateSubCat } from "../../../Forms/AdminCatAndSubca/UpadateSubCat";
import Swal from "sweetalert2";

const AdministrateCategoriesToAdmin = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const allSubCategories = useSelector((state) => state.subCategories);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  const [updating, setUpdating] = useState(false);
  const [idCat, setIdCat] = useState(0);

  const categoryToUpdate = allCategories?.find((c) => c.id == idCat);

  const validationSchema = yup.object({
    name: yup
      .string("Ingrese el nombre de la nueva categoria")
      .notOneOf(
        allCategories.map((c) => c?.name),
        "Ya existe esa  categoría"
      )
      .required("El nombre es requerido"),

    description: yup.string("Ingrese el nombre de la nueva categoria"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        background: "#DFDCD3",
        icon: "success",
        title: "Editada",
        showConfirmButton: false,
        timer: 1500,
      });

      await dispatch(putCategory(idCat, values));
      await dispatch(getCategories());
      resetForm({ values: "" });
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
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography sx={{ mb: 5 }}>
        Categorias existentes: {allCategories.length}{" "}
      </Typography>
      {allCategories?.map((c) => {
        return (
          <TableContainer
            component={Paper}
            align="center"
            sx={{ width: "100%" }}
          >
            <TableRow>
              <TableCell>{c?.name}</TableCell>
              <TableCell>{c?.description}</TableCell>
              <TableCell>
                <Button
                  value={c.id}
                  onClick={(e) => handleUpdateCat(e)}
                  name="delete"
                  startIcon={<EditIcon />}
                  variant="contained"
                  color="ambar3"
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  value={c.id}
                  onClick={(e) => handleDeleteCat(e)}
                  name="delete"
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="ambar3"
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          </TableContainer>
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
            sx={{ m: 1 }}
          >
            <Typography> Editando a: {categoryToUpdate?.name}</Typography>
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
              variant="contained"
              color="ambar3"
              sx={{ ml: 1, mr: 1 }}
            >
              Confirmar edición
            </Button>

            {updating && (
              <Button
                type="submit"
                onClick={(e) => setUpdating(false)}
                variant="contained"
                color="ambar3"
              >
                Cancelar edición
              </Button>
            )}
          </Box>
        </>
      )}

      <UpadateSubCat allSubCategories={allSubCategories} />
    </Box>
  );
};

export default AdministrateCategoriesToAdmin;
